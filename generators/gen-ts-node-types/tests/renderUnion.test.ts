import { describe, expect, it } from 'vitest';

import type { Layout } from '../src/layout';
import { buildLayout } from '../src/layout';
import { renderUnion } from '../src/renderUnion';
import { defineUnion, microSpec, union } from './_fixtures';

/**
 * A hand-built layout used by tests that exercise unions whose names are
 * not present in the production `UNION_LOCATIONS` table. Keeps the test
 * surface free of accidental dependencies on the real spec's union list.
 */
function manualLayout(overrides: Partial<Layout> = {}): Layout {
    return {
        enumerationNameToLocation: new Map(),
        nodeKindToLocation: new Map(),
        sharedLocations: {
            camelCaseString: 'shared/brands',
            codamaVersion: 'shared/version',
            kebabCaseString: 'shared/brands',
            nestedTypeNode: 'typeNodes/NestedTypeNode',
            node: 'Node',
            nodeKind: 'Node',
            pascalCaseString: 'shared/brands',
            snakeCaseString: 'shared/brands',
            titleCaseString: 'shared/brands',
            version: 'shared/version',
        },
        unionNameToLocation: new Map(),
        ...overrides,
    };
}

describe('renderUnion', () => {
    it('renders a union of node references with sorted members', () => {
        const spec = microSpec();
        const layout = buildLayout(spec);
        const u = defineUnion('TypeNode', {
            members: ['innerTypeNode'],
        });
        const result = renderUnion(u, { layout, currentLocation: 'typeNodes/TypeNode' });
        expect(result.content).toContain('export type TypeNode =\n    | InnerTypeNode;');
    });

    it('preserves nested union references and collects imports', () => {
        // Synthetic two-node, two-union spec. We bypass `buildLayout` here
        // because neither `Inner` nor any synthetic union name is part of
        // the production `UNION_LOCATIONS` table.
        const outer = defineUnion('Outer', { members: [union('Inner'), 'aNode'] });
        const layout = manualLayout({
            nodeKindToLocation: new Map([
                ['aNode', 'typeNodes/ANode'],
                ['bNode', 'typeNodes/BNode'],
            ]),
            unionNameToLocation: new Map([
                ['Outer', 'typeNodes/Outer'],
                ['Inner', 'typeNodes/Inner'],
            ]),
        });
        const result = renderUnion(outer, { layout, currentLocation: 'typeNodes/Outer' });
        // Members render in PascalCase order: ANode, Inner.
        expect(result.content).toMatch(/export type Outer =\n {4}\| ANode\n {4}\| Inner;\n/);
        // ANode is in the same directory as the current file → ./ANode.
        // Inner is in the same directory as the current file → ./Inner.
        expect([...result.imports.keys()].sort()).toEqual(['./ANode', './Inner']);
    });

    it('emits the union-level docs as a JSDoc block when present', () => {
        const u = defineUnion('U', { docs: 'My union.', members: ['aNode'] });
        const layout = manualLayout({
            nodeKindToLocation: new Map([['aNode', 'aNode']]),
            unionNameToLocation: new Map([['U', 'typeNodes/U']]),
        });
        const result = renderUnion(u, { layout, currentLocation: 'typeNodes/U' });
        expect(result.content.startsWith('/** My union. */\n')).toBe(true);
    });
});
