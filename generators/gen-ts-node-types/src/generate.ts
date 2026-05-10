/**
 * Top-level orchestration: walk a Codama spec, render every file, format
 * with Prettier, and write into the caller-provided output directory.
 *
 * The generator is a pure function of `(spec, options)`. It does not load
 * a spec implicitly; per-major drivers (e.g. `v1.ts`) are responsible for
 * importing the right `getSpec()` and supplying their own narrowable /
 * generic-order tables. This makes it possible to invoke the same
 * generator twice in one process — once per spec major — without any
 * shared module-level state.
 *
 * Strategy: delete-and-recreate the output directory so stale files can
 * never linger.
 */

import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import type { Spec } from '@codama/spec';
import { type Fragment, renderPage } from '@codama-internal/fragment';
import prettier from 'prettier';

import { buildLayout, type Layout, type Location } from './layout';
import { renderEnumeration } from './renderEnumeration';
import { renderNode } from './renderNode';
import {
    renderBrandsFile,
    renderDocsFile,
    renderNestedUnionFile,
    renderNodeMasterFile,
    renderVersionFile,
} from './renderSpecial';
import { renderUnion } from './renderUnion';

export interface GenerateOptions {
    /** Absolute path to the output directory (e.g. `<repo>/js/node-types/src/generated`). */
    readonly outputDir: string;
    /** Whether to format output with Prettier. Defaults to `true`. */
    readonly format?: boolean;
    /**
     * The spec major version this invocation targets. Validated against
     * `spec.version` at startup; a mismatch fails the run loudly rather
     * than producing silently wrong output. Required so every caller
     * makes the choice deliberately.
     */
    readonly targetSpecMajor: number;
    /**
     * `${nodeKind}:${attribute}` keys whose data attribute should be
     * lifted to a generic param even though the spec classifies it as
     * data. Empty / omitted means the default "lift only children" rule
     * applies. Each key is cross-checked against the spec at startup.
     */
    readonly narrowableDataAttributes?: ReadonlySet<string>;
    /**
     * Per-node override of the generic-parameter emission order. Keys
     * are node kinds; values list the source attribute names whose
     * generic params should appear in this exact order. The override
     * must enumerate exactly the set of attributes the renderer lifts
     * for the node — no more, no fewer — otherwise the run fails.
     */
    readonly genericParamOrder?: ReadonlyMap<string, readonly string[]>;
}

/**
 * Run the generator. Wipes `options.outputDir`, then writes the
 * freshly-rendered file tree.
 */
export async function generate(spec: Spec, options: GenerateOptions): Promise<void> {
    validateGenerateOptions(spec, options);
    const layout = buildLayout(spec);
    const files = renderAllFiles(spec, options, layout);

    await rm(options.outputDir, { recursive: true, force: true });
    await mkdir(options.outputDir, { recursive: true });

    const format = options.format ?? true;
    const prettierConfig = format ? await prettier.resolveConfig(options.outputDir) : null;

    for (const [relPath, contents] of files) {
        const fullPath = path.join(options.outputDir, `${relPath}.ts`);
        await mkdir(path.dirname(fullPath), { recursive: true });
        const formatted = format
            ? await prettier.format(contents, { ...prettierConfig, filepath: fullPath, parser: 'typescript' })
            : contents;
        await writeFile(fullPath, formatted, 'utf8');
    }
}

/**
 * Cross-check the caller-supplied options against the loaded spec. Catches
 * common configuration drift — e.g. a per-major driver added a
 * `narrowableDataAttributes` entry that no longer matches the spec — at
 * generation time, with a clear message, instead of silently producing a
 * stale shape.
 *
 * Exposed for tests; consumers normally hit it transitively via `generate`.
 */
export function validateGenerateOptions(spec: Spec, options: GenerateOptions): void {
    const actualMajor = parseSpecMajor(spec.version);
    if (actualMajor !== options.targetSpecMajor) {
        throw new Error(
            `generate: targetSpecMajor=${options.targetSpecMajor} but the supplied spec is at version "${spec.version}" (major ${actualMajor}).`,
        );
    }

    // Build a quick lookup `${nodeKind}:${attributeName}` → exists.
    const validKeys = new Set<string>();
    const validNodeKinds = new Set<string>();
    for (const category of spec.categories) {
        for (const node of category.nodes) {
            validNodeKinds.add(node.kind);
            for (const attr of node.attributes) {
                validKeys.add(`${node.kind}:${attr.name}`);
            }
        }
    }

    if (options.narrowableDataAttributes) {
        for (const key of options.narrowableDataAttributes) {
            if (!validKeys.has(key)) {
                throw new Error(
                    `narrowableDataAttributes references "${key}" which is not a (nodeKind, attribute) pair in the spec.`,
                );
            }
        }
    }

    if (options.genericParamOrder) {
        for (const [kind, order] of options.genericParamOrder) {
            if (!validNodeKinds.has(kind)) {
                throw new Error(`genericParamOrder references unknown node kind "${kind}".`);
            }
            // The renderer also validates that `order` matches the lifted
            // set exactly; here we only catch attribute names that don't
            // exist on the node at all (a typo would otherwise produce a
            // misleading "missing lifted attribute" error from `renderNode`).
            for (const attrName of order) {
                if (!validKeys.has(`${kind}:${attrName}`)) {
                    throw new Error(
                        `genericParamOrder for "${kind}" references attribute "${attrName}" which the spec does not declare.`,
                    );
                }
            }
        }
    }
}

function parseSpecMajor(version: string): number {
    const m = /^(\d+)\./.exec(version);
    if (!m) throw new Error(`generate: unable to parse spec version "${version}".`);
    return Number(m[1]);
}

/**
 * Render every file the generator produces, returning a map from
 * `<location-without-extension>` to file contents (pre-format).
 *
 * Exposed separately from `generate` so tests can exercise the full
 * pipeline without touching the filesystem.
 */
export function renderAllFiles(spec: Spec, options: GenerateOptions, layout: Layout): Map<Location, string> {
    const out = new Map<Location, string>();
    const renderNodeOptions = {
        genericParamOrder: options.genericParamOrder,
        narrowableDataAttributes: options.narrowableDataAttributes,
    };

    for (const category of spec.categories) {
        // Per-node interface files.
        for (const node of category.nodes) {
            const location = layout.nodeKindToLocation.get(node.kind);
            if (!location) throw new Error(`renderAllFiles: missing location for node "${node.kind}"`);
            const body = renderNode(node, { layout, currentLocation: location, ...renderNodeOptions });
            out.set(location, renderPage(body));
        }

        // Per-union files.
        for (const union of category.unions) {
            const location = layout.unionNameToLocation.get(union.name);
            if (!location) throw new Error(`renderAllFiles: missing location for union "${union.name}"`);
            const body = renderUnion(union, { layout, currentLocation: location });
            out.set(location, renderPage(body));
        }

        // Per-enumeration files.
        for (const enumeration of category.enumerations) {
            const location = layout.enumerationNameToLocation.get(enumeration.name);
            if (!location) throw new Error(`renderAllFiles: missing location for enumeration "${enumeration.name}"`);
            out.set(location, renderPage(renderEnumeration(enumeration)));
        }

        // Per-nested-union alias files.
        for (const nu of category.nestedUnions) {
            const location = layout.nestedUnionNameToLocation.get(nu.name);
            if (!location) throw new Error(`renderAllFiles: missing location for nested union "${nu.name}"`);
            const body = renderNestedUnionFile(nu, layout, location);
            out.set(location, renderPage(body));
        }
    }

    // Shared files: brands, docs, and version.
    out.set(layout.sharedLocations.camelCaseString, renderPage(renderBrandsFile()));
    out.set(layout.sharedLocations.docs, renderPage(renderDocsFile()));
    out.set(layout.sharedLocations.version, renderPage(renderVersionFile(spec.version)));

    // Special: master Node.ts.
    {
        const location = layout.sharedLocations.node;
        const body = renderNodeMasterFile(spec, layout, location);
        out.set(location, renderPage(body));
    }

    // Index files for every directory that has files.
    addIndexFiles(out);

    return out;
}

function addIndexFiles(files: Map<Location, string>): void {
    // Group by directory.
    const byDir = new Map<string, string[]>();
    for (const location of files.keys()) {
        const slashIdx = location.lastIndexOf('/');
        const dir = slashIdx === -1 ? '' : location.slice(0, slashIdx);
        const fileName = slashIdx === -1 ? location : location.slice(slashIdx + 1);
        const list = byDir.get(dir) ?? [];
        list.push(fileName);
        byDir.set(dir, list);
    }

    // Subdirectory indexes.
    for (const [dir, fileNames] of byDir) {
        if (dir === '') continue;
        const indexLocation = `${dir}/index`;
        const sorted = [...fileNames].sort((a, b) => a.localeCompare(b));
        const body = sorted.map(name => `export * from './${name}';`).join('\n') + '\n';
        files.set(indexLocation, body);
    }

    // Top-level index: re-exports the top-level files + each subdirectory.
    const topLevelFiles = (byDir.get('') ?? []).slice().sort((a, b) => a.localeCompare(b));
    const subdirs = [...byDir.keys()]
        .filter(dir => dir !== '')
        .map(dir => dir.split('/')[0])
        .filter((d, i, all) => all.indexOf(d) === i)
        .sort((a, b) => a.localeCompare(b));
    const indexLines: string[] = [];
    for (const name of topLevelFiles) indexLines.push(`export * from './${name}';`);
    if (topLevelFiles.length > 0 && subdirs.length > 0) indexLines.push('');
    for (const subdir of subdirs) indexLines.push(`export * from './${subdir}';`);
    files.set('index', indexLines.join('\n') + '\n');
}

// Re-export Fragment for convenience in tests.
export type { Fragment };
