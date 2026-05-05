/**
 * Render a `UnionSpec` as a TS type alias whose right-hand side is a
 * pipe-separated union of references. Members may be node interfaces or
 * other unions; nested unions are rendered as references to their alias
 * names. Member references collect imports.
 */

import type { UnionMember, UnionSpec } from '@codama/spec';
import { type Fragment, fragment, mergeFragments, use } from '@codama-internal/fragment';

import { type Layout, type Location, relativeImportPath } from './layout';
import { pascalCase } from './naming';
import { renderJsDoc } from './renderDocs';

export interface RenderUnionOptions {
    readonly layout: Layout;
    readonly currentLocation: Location;
}

export function renderUnion(union: UnionSpec, options: RenderUnionOptions): Fragment {
    const memberFragments = sortMembers(union.members).map(member => renderMember(member, options));
    const docComment = union.docs ? renderJsDoc(union.docs) : fragment``;
    const body = mergeFragments(memberFragments, parts => parts.map(p => `    | ${p}`).join('\n'));
    return fragment`${docComment}export type ${union.name} =\n${body};\n`;
}

function renderMember(member: UnionMember, options: RenderUnionOptions): Fragment {
    if (member.kind === 'node') {
        const target = options.layout.nodeKindToLocation.get(member.name);
        if (!target) throw new Error(`renderUnion: unknown node kind "${member.name}"`);
        const interfaceName = pascalCase(member.name);
        return importNamed(options.currentLocation, interfaceName, target);
    }
    const target = options.layout.unionNameToLocation.get(member.name);
    if (!target) throw new Error(`renderUnion: unknown union "${member.name}"`);
    return importNamed(options.currentLocation, member.name, target);
}

function sortMembers(members: readonly UnionMember[]): readonly UnionMember[] {
    return [...members].sort((a, b) => {
        const aName = pascalCase(a.name);
        const bName = pascalCase(b.name);
        return aName.localeCompare(bName);
    });
}

function importNamed(currentLocation: Location, identifier: string, targetLocation: Location): Fragment {
    if (targetLocation === currentLocation) return fragment`${identifier}`;
    const path = relativeImportPath(currentLocation, targetLocation);
    return use(`type ${identifier}`, path);
}
