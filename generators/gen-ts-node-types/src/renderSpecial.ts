/**
 * Renderers for the handful of TS files that aren't a 1:1 mapping of a
 * single spec entity:
 *
 *   - `NestedTypeNode<T>` — recursive generic alias derived from the
 *     spec's `nestedTypeNodeWrappers` list.
 *   - `Node` master union + `NodeKind` + `GetNodeFromKind`.
 *   - `shared/brands.ts` — branded string types (CamelCaseString, etc.).
 *   - `shared/version.ts` — `Version` template-literal type and
 *     `CodamaVersion` literal type pinned to the spec version.
 */

import type { Spec } from '@codama/spec';
import { type Fragment, fragment, mergeFragments, use } from '@codama-internal/fragment';

import { type Layout, type Location, relativeImportPath } from './layout';
import { pascalCase } from './naming';

const BRANDS: readonly { readonly name: string; readonly slug: string }[] = [
    { name: 'CamelCaseString', slug: 'camelCase' },
    { name: 'KebabCaseString', slug: 'kebabCase' },
    { name: 'PascalCaseString', slug: 'pascalCase' },
    { name: 'SnakeCaseString', slug: 'snakeCase' },
    { name: 'TitleCaseString', slug: 'titleCase' },
];

export function renderBrandsFile(): Fragment {
    const body = BRANDS.map(b =>
        [
            '/**',
            ` * A string asserted to be in ${b.slug} form.`,
            ' *',
            ' * The brand is purely a TypeScript marker; runtime parsing and validation',
            ' * happen wherever string identifiers cross the package boundary.',
            ' */',
            `export type ${b.name} = string & {`,
            `    readonly ['__stringCase:codama']: '${b.slug}';`,
            '};',
        ].join('\n'),
    ).join('\n\n');
    return fragment`${body}\n`;
}

export function renderVersionFile(specVersion: string): Fragment {
    const body = [
        '/** A semver-shaped version string (e.g. "1.6.0"). */',
        'export type Version = `${number}.${number}.${number}`;',
        '',
        '/**',
        ' * The Codama spec version this package describes. Pinned to the literal',
        ' * version of the spec at generation time; documents conforming to this',
        ' * version of the spec carry this exact string.',
        ' */',
        `export type CodamaVersion = '${specVersion}';`,
        '',
    ].join('\n');
    return fragment`${body}`;
}

/**
 * The shared `Docs` alias used by every `docs?` attribute in the spec.
 * Carries the documentation-array intent through the generated tree
 * rather than inlining `Array<string>` at every site.
 */
export function renderDocsFile(): Fragment {
    const body = [
        '/** Markdown documentation for a node — one paragraph per array entry. */',
        'export type Docs = Array<string>;',
        '',
    ].join('\n');
    return fragment`${body}`;
}

/**
 * The recursive `NestedTypeNode<T>` alias. Wrapper kinds come from the
 * spec's `nestedTypeNodeWrappers` field — they're the type nodes whose
 * shape is `{ type: ... }` and which can wrap another type recursively.
 */
export function renderNestedTypeNodeFile(spec: Spec, layout: Layout, currentLocation: Location): Fragment {
    const wrappers = [...spec.nestedTypeNodeWrappers].sort();

    const typeNodeTarget = layout.unionNameToLocation.get('TypeNode');
    if (!typeNodeTarget) throw new Error('renderNestedTypeNodeFile: spec is missing the TypeNode union');
    const typeNodeRef = use('type TypeNode', relativeImportPath(currentLocation, typeNodeTarget));

    const wrapperRefs = wrappers.map(kind => {
        const target = layout.nodeKindToLocation.get(kind);
        if (!target) throw new Error(`renderNestedTypeNodeFile: unknown wrapper "${kind}"`);
        const interfaceName = pascalCase(kind);
        const path = relativeImportPath(currentLocation, target);
        return use(`type ${interfaceName}`, path);
    });

    const allRefs: Fragment[] = [typeNodeRef, ...wrapperRefs];
    return mergeFragments(allRefs, () => {
        const lines: string[] = [];
        lines.push('/**');
        lines.push(' * A type, possibly wrapped in zero-or-more size, offset, sentinel, or hidden');
        lines.push(' * prefix/suffix modifiers. The wrapping is recursive: each modifier wraps');
        lines.push(' * another `NestedTypeNode<T>` until the inner `T` is reached.');
        lines.push(' */');
        lines.push(`export type NestedTypeNode<TType extends ${typeNodeRef.content}> =`);
        for (const w of wrapperRefs) {
            lines.push(`    | ${w.content}<NestedTypeNode<TType>>`);
        }
        lines.push('    | TType;');
        lines.push('');
        return lines.join('\n');
    });
}

/**
 * The master `Node.ts` file: union of every concrete node kind, plus
 * `NodeKind` and `GetNodeFromKind` helpers.
 *
 * Includes every `Registered<Category>Node` union (which together cover
 * every category-tagged node), then any top-level node that isn't already
 * a member of one of those (the uncategorised top-level nodes).
 */
export function renderNodeMasterFile(spec: Spec, layout: Layout, currentLocation: Location): Fragment {
    const categoryUnions = [
        'RegisteredContextualValueNode',
        'RegisteredCountNode',
        'RegisteredDiscriminatorNode',
        'RegisteredLinkNode',
        'RegisteredPdaSeedNode',
        'RegisteredTypeNode',
        'RegisteredValueNode',
    ];

    const registeredKinds = new Set<string>();
    const memberRefs: Fragment[] = [];

    for (const unionName of categoryUnions) {
        const union = spec.unions.find(u => u.name === unionName);
        if (!union) continue;
        collectKindsFromUnion(spec, union.name, registeredKinds);
        const target = layout.unionNameToLocation.get(union.name);
        if (!target) throw new Error(`renderNodeMasterFile: missing location for union "${union.name}"`);
        memberRefs.push(use(`type ${unionName}`, relativeImportPath(currentLocation, target)));
    }

    for (const node of spec.nodes) {
        if (registeredKinds.has(node.kind)) continue;
        const target = layout.nodeKindToLocation.get(node.kind);
        if (!target) throw new Error(`renderNodeMasterFile: missing location for node "${node.kind}"`);
        memberRefs.push(use(`type ${pascalCase(node.kind)}`, relativeImportPath(currentLocation, target)));
    }

    return mergeFragments(memberRefs, () => {
        const sorted = [...memberRefs].sort((a, b) => a.content.localeCompare(b.content));
        const memberLines = sorted.map(r => `    | ${r.content}`).join('\n');
        return [
            '// Node Registration.',
            "export type NodeKind = Node['kind'];",
            'export type Node =',
            `${memberLines};`,
            '',
            '// Node Helpers.',
            'export type GetNodeFromKind<TKind extends NodeKind> = Extract<Node, { kind: TKind }>;',
            '',
        ].join('\n');
    });
}

function collectKindsFromUnion(spec: Spec, unionName: string, out: Set<string>): void {
    const visited = new Set<string>();
    const stack: string[] = [unionName];
    while (stack.length > 0) {
        const name = stack.pop()!;
        if (visited.has(name)) continue;
        visited.add(name);
        const union = spec.unions.find(u => u.name === name);
        if (!union) continue;
        for (const m of union.members) {
            if (m.kind === 'node') out.add(m.name);
            else if (m.kind === 'union') stack.push(m.name);
        }
    }
}
