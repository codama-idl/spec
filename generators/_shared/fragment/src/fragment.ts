/**
 * A `Fragment` is a unit of generated code carrying both its rendered
 * content and the imports that content depends on.
 *
 * Fragments compose through the `fragment` tagged-template helper: when one
 * fragment is interpolated into another, both its content and its imports
 * propagate. Imports are resolved into actual `import { … } from '…'`
 * statements only at the very end via `importMapToString` (typically inside
 * `renderPage`).
 *
 * Adapted from the @codama/renderers-js Fragment helper, simplified to drop
 * Solana-kit-specific concerns (kit import strategies, dependency maps,
 * features). For our generators, all imports are plain module paths.
 */

import {
    addToImportMap,
    createImportMap,
    type ImportInput,
    type ImportMap,
    importMapToString,
    mergeImportMaps,
    type Module,
    parseImportInput,
} from './importMap';

export interface Fragment {
    readonly content: string;
    readonly imports: ImportMap;
}

/**
 * Construct a fragment with raw content and no imports. Internal helper —
 * external callers should use the `fragment` tagged-template form, which
 * is uniform across both string-only and interpolated fragments.
 */
function rawFragment(content: string): Fragment {
    return Object.freeze({ content, imports: createImportMap() });
}

/**
 * Tagged-template helper for composing fragments. Interpolated values may
 * be:
 *   - A `Fragment` — its content is inlined and its imports propagate.
 *   - `undefined` — rendered as an empty string.
 *   - A primitive (`string`, `number`, `boolean`, `bigint`, or `null`)
 *     — coerced to its source-style string and inlined verbatim.
 *
 * Anything else (objects, functions, symbols) is rejected with an explicit
 * error so the default `[object Object]` stringification can never sneak
 * into generated source.
 *
 * Example:
 *   fragment`export interface ${name} { ${field} }`
 */
export function fragment(template: TemplateStringsArray, ...items: unknown[]): Fragment {
    const fragments: Fragment[] = [];
    const parts: string[] = [];
    for (let i = 0; i < items.length; i++) {
        parts.push(template[i]);
        const item = items[i];
        if (item === undefined) continue;
        if (isFragment(item)) {
            fragments.push(item);
            parts.push(item.content);
        } else {
            parts.push(stringifyInterpolation(item));
        }
    }
    parts.push(template[template.length - 1]);
    return mergeFragments(fragments, () => parts.join(''));
}

/** Type guard for Fragment values. */
export function isFragment(value: unknown): value is Fragment {
    return typeof value === 'object' && value !== null && 'content' in value && 'imports' in value;
}

/**
 * Coerce a non-Fragment interpolation value to a string.
 *
 * Restricted to primitive types — every renderer in this codebase only
 * ever interpolates Fragments, strings, numbers, or booleans. Refusing
 * objects outright keeps the default `[object Object]` stringification
 * from ever sneaking into generated source.
 */
function stringifyInterpolation(value: unknown): string {
    if (value === null) return 'null';
    switch (typeof value) {
        case 'string':
            return value;
        case 'number':
        case 'boolean':
        case 'bigint':
            return String(value);
        default:
            throw new Error(`fragment: cannot interpolate value of type ${typeof value}`);
    }
}

/**
 * Combine multiple fragments into one. The merge strategy for content is
 * supplied by the caller (`mergeContent`); imports are merged
 * automatically.
 */
export function mergeFragments(
    fragments: readonly (Fragment | undefined)[],
    mergeContent: (contents: string[]) => string,
): Fragment {
    const filtered = fragments.filter((f): f is Fragment => f !== undefined);
    return Object.freeze({
        content: mergeContent(filtered.map(f => f.content)),
        imports: mergeImportMaps(filtered.map(f => f.imports)),
    });
}

/**
 * Construct a fragment that references a single imported identifier.
 *
 * Example:
 *   use('PdaLinkNode', '../linkNodes/PdaLinkNode')
 *     → content `'PdaLinkNode'` + an import of `PdaLinkNode` from that module
 *
 *   use('type PdaLinkNode', '../linkNodes/PdaLinkNode')
 *     → content `'PdaLinkNode'` + a type-only import
 */
export function use(importInput: ImportInput, module: Module): Fragment {
    const info = parseImportInput(importInput);
    const empty = rawFragment(info.usedIdentifier);
    return addFragmentImports(empty, module, [importInput]);
}

/** Append imports to an existing fragment. */
export function addFragmentImports(fragment: Fragment, module: Module, imports: ImportInput[]): Fragment {
    return Object.freeze({
        ...fragment,
        imports: addToImportMap(fragment.imports, module, imports),
    });
}

/**
 * Build a final TS file string from a body fragment by prepending the
 * resolved import block (if any) and an optional header.
 */
export function renderPage(body: Fragment, options: { header?: string } = {}): string {
    const sections: string[] = [];
    if (options.header) sections.push(options.header);
    if (body.imports.size > 0) sections.push(importMapToString(body.imports));
    sections.push(body.content);
    return sections.join('\n\n').trimEnd() + '\n';
}
