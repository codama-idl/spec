import { beforeAll, describe, expect, it } from 'vitest';

import { defineCategory } from '../../src/api';
import type { Spec } from '../../src/api';
import { buildNavigation, buildNavRegistry, categoryGroups } from '../../src/docs/navigation';
import { LocalDocsPathConfig } from '../../src/docs/pathConfig';
import { pascalCase, refName } from '../../src/docs/ref';
import type { Navigation, NavRegistry, PathConfig } from '../../src/docs/types';
import { SPEC, topLevelCategory, typeCategory } from './__fixtures__/spec';

describe('buildNavRegistry', () => {
    let registry: NavRegistry;
    beforeAll(() => {
        registry = buildNavRegistry(LocalDocsPathConfig, SPEC);
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
            'pdaSeedNodes/README',
        );
        expect(registry.lookup({ kind: 'rootIndex' }).pathSegments.join('/')).toBe('README');
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
        // 9 entities + 3 non-topLevel category indexes (type, pdaSeed, shared) + 1 rootIndex
        expect(registry.entries).toHaveLength(13);
        for (const entry of registry.entries) {
            expect(registry.lookup(entry.ref)).toBe(entry);
        }
    });
    it('throws when two refs map to the same DocRefKey', () => {
        const dupSpec: Spec = { version: '1.0.0', categories: [defineCategory('type'), defineCategory('type')] };
        expect(() => buildNavRegistry(LocalDocsPathConfig, dupSpec)).toThrow('Duplicate DocRef registration');
    });
    it('throws when two distinct refs resolve to the same path', () => {
        // a custom config whose fileName collapses every ref to one basename at the root -> path collision
        const collidingConfig: PathConfig = { categoryDir: () => '', fileName: () => 'Same', indexFileName: 'README' };
        expect(() => buildNavRegistry(collidingConfig, SPEC)).toThrow(
            'Duplicate DocRef path: Same (for node:numberTypeNode and union:typeNode)',
        );
    });
});

describe('buildNavigation', () => {
    let nav: Navigation;
    beforeAll(() => {
        nav = buildNavigation(LocalDocsPathConfig, SPEC);
    });

    it('lists rootIndex then non-topLevel category indexes in spec order', () => {
        expect(nav.root).toEqual([
            { kind: 'rootIndex' },
            { kind: 'categoryIndex', category: 'type' },
            { kind: 'categoryIndex', category: 'pdaSeed' },
            { kind: 'categoryIndex', category: 'shared' },
        ]);
    });
    it('includes every category in spec order', () => {
        expect(nav.categories.map(category => category.name)).toEqual(['type', 'pdaSeed', 'shared', 'topLevel']);
    });
    it('orders category pages alphabetically within type groups', () => {
        const type = nav.categories.find(category => category.name === 'type');
        expect(type?.pages).toEqual([
            { kind: 'node', name: 'numberTypeNode' },
            { kind: 'union', name: 'typeNode' },
            { kind: 'nestedUnion', name: 'nestedTypeNode' },
        ]);
    });
    it('orders pages by group first, then alphabetically within the group', () => {
        // topLevel holds nodes [programNode, pdaNode] + union helperUnion: nodes come first (sorted),
        // then the union - even though 'helperUnion' sorts before 'programNode' in a flat alpha order.
        const topLevel = nav.categories.find(category => category.name === 'topLevel');
        expect(topLevel?.pages).toEqual([
            { kind: 'node', name: 'pdaNode' },
            { kind: 'node', name: 'programNode' },
            { kind: 'union', name: 'helperUnion' },
        ]);
    });
    it('lists only entity refs in category pages (no index or root refs)', () => {
        const kinds = new Set(nav.categories.flatMap(category => category.pages).map(ref => ref.kind));
        expect(kinds.has('rootIndex')).toBe(false);
        expect(kinds.has('categoryIndex')).toBe(false);
    });
    it('surfaces only refs that resolve in the registry (no orphans)', () => {
        const registry = buildNavRegistry(LocalDocsPathConfig, SPEC);
        const navRefs = [...nav.root, ...nav.categories.flatMap(category => category.pages)];
        for (const ref of navRefs) {
            expect(() => registry.lookup(ref)).not.toThrow();
        }
    });
});

describe('buildNavigation - source spec is not mutated', () => {
    it('does not mutate the source category node order', () => {
        buildNavigation(LocalDocsPathConfig, SPEC);
        expect(topLevelCategory.nodes.map(n => n.kind)).toEqual(['programNode', 'pdaNode']);
    });
});

describe('buildNavigation - registry/navigation agree on which categories have an index', () => {
    const rootTypeConfig: PathConfig = {
        categoryDir: c => (c.name === 'type' ? '' : `${c.name}Nodes`),
        fileName: ref => pascalCase(refName(ref)),
        indexFileName: 'README',
    };

    it('emits a categoryIndex ref exactly for categories with their own directory', () => {
        const nav = buildNavigation(rootTypeConfig, SPEC);
        expect(nav.root).toEqual([
            { kind: 'rootIndex' },
            { kind: 'categoryIndex', category: 'pdaSeed' },
            { kind: 'categoryIndex', category: 'shared' },
            { kind: 'categoryIndex', category: 'topLevel' },
        ]);
    });
    it('every nav root ref resolves in the registry (no orphans) under the same config', () => {
        const nav = buildNavigation(rootTypeConfig, SPEC);
        const registry = buildNavRegistry(rootTypeConfig, SPEC);
        for (const ref of nav.root) {
            expect(() => registry.lookup(ref)).not.toThrow();
        }
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
