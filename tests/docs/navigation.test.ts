import { beforeAll, describe, expect, it } from 'vitest';

import { defineCategory } from '../../src/api';
import type { Spec } from '../../src/api';
import { buildNavRegistry, categoryGroups } from '../../src/docs/navigation';
import type { NavRegistry } from '../../src/docs/types';
import { SPEC, typeCategory } from './__fixtures__/spec';

describe('buildNavRegistry', () => {
    let registry: NavRegistry;
    beforeAll(() => {
        registry = buildNavRegistry(SPEC);
    });

    it('files pdaSeed nodes under pdaSeedNodes with PascalCase names', () => {
        expect(registry.lookup({ kind: 'node', name: 'constantPdaSeedNode' }).pathSegments.join('/')).toBe(
            'pdaSeedNodes/ConstantPdaSeedNode',
        );
    });
    it('files non-node entities under their category folder with PascalCase names', () => {
        expect(registry.lookup({ kind: 'union', name: 'typeNode' }).pathSegments.join('/')).toBe('typeNodes/TypeNode');
        expect(registry.lookup({ kind: 'nestedUnion', name: 'nestedTypeNode' }).pathSegments.join('/')).toBe(
            'typeNodes/NestedTypeNode',
        );
        expect(registry.lookup({ kind: 'enumeration', name: 'numberFormat' }).pathSegments.join('/')).toBe(
            'sharedNodes/NumberFormat',
        );
    });
    it('puts topLevel nodes and unions at the docs root', () => {
        expect(registry.lookup({ kind: 'node', name: 'pdaNode' }).pathSegments.join('/')).toBe('PdaNode');
        expect(registry.lookup({ kind: 'union', name: 'helperUnion' }).pathSegments.join('/')).toBe('HelperUnion');
    });
    it('names the index files from the preset', () => {
        expect(registry.lookup({ kind: 'categoryIndex', category: 'pdaSeed' }).pathSegments.join('/')).toBe(
            'pdaSeedNodes/index',
        );
        expect(registry.lookup({ kind: 'rootIndex' }).pathSegments.join('/')).toBe('index');
    });
    it('emits no categoryIndex entry for topLevel (shares root index)', () => {
        expect(() => registry.lookup({ kind: 'categoryIndex', category: 'topLevel' })).toThrow(
            'Unresolved DocRef: categoryIndex:topLevel',
        );
    });
    it('throws on an unknown ref', () => {
        expect(() => registry.lookup({ kind: 'node', name: 'nope' })).toThrow('Unresolved DocRef: node:nope');
    });
    it('registers every entity + non-topLevel index + root', () => {
        // 10 entities + 3 non-topLevel category indexes (type, pdaSeed, shared) + 1 rootIndex
        expect(registry.entries).toHaveLength(14);
        for (const entry of registry.entries) {
            expect(registry.lookup(entry.ref)).toBe(entry);
        }
    });
    it('throws when two refs map to the same DocRefKey', () => {
        const dupSpec: Spec = { version: '1.0.0', categories: [defineCategory('type'), defineCategory('type')] };
        expect(() => buildNavRegistry(dupSpec)).toThrow('Duplicate DocRef registration');
    });
});

describe('categoryGroups', () => {
    it('returns the four kinds groups in fixed order', () => {
        const groups = categoryGroups(defineCategory('empty'));
        expect(groups.map(group => group.kind)).toEqual(['node', 'union', 'nestedUnion', 'enumeration']);
        expect(groups.every(group => group.items.length === 0)).toBe(true);
    });
    it('carries each entity doc through', () => {
        const nodes = categoryGroups(typeCategory).find(group => group.kind === 'node');
        expect(nodes?.items[0]).toEqual({ ref: { kind: 'node', name: 'numberTypeNode' }, docs: ['A number type.'] });
    });
});
