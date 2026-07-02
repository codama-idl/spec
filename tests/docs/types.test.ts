import { describe, expectTypeOf, it } from 'vitest';

import type { DocRef, DocRefKey, InjectPage } from '../../src/docs/types';

describe('DocRef type', () => {
    it('exposes exactly the six known kinds', () => {
        expectTypeOf<DocRef['kind']>().toEqualTypeOf<
            'categoryIndex' | 'enumeration' | 'nestedUnion' | 'node' | 'rootIndex' | 'union'
        >();
    });
    it('discriminates its payload on kind', () => {
        expectTypeOf<Extract<DocRef, { kind: 'node' }>>().toHaveProperty('name');
        expectTypeOf<Extract<DocRef, { kind: 'categoryIndex' }>>().toHaveProperty('category');
        expectTypeOf<Extract<DocRef, { kind: 'rootIndex' }>>().toEqualTypeOf<{ readonly kind: 'rootIndex' }>();
    });
});

describe('DocRefKey type', () => {
    it('admits <kind>:<name> literals and rejects bare kinds or unknown kinds', () => {
        expectTypeOf<'node:pdaNode'>().toExtend<DocRefKey>();
        expectTypeOf<'rootIndex:root'>().toExtend<DocRefKey>();
        expectTypeOf<'categoryIndex:pdaSeed'>().toExtend<DocRefKey>();
        expectTypeOf<'node'>().not.toExtend<DocRefKey>();
        expectTypeOf<'unknownKind:foo'>().not.toExtend<DocRefKey>();
    });
});

describe('InjectPage type', () => {
    // The doc comment on both types states InjectPage kinds map 1:1 onto DocRef kinds.
    // This guards that invariant: adding a kind to one without the other fails the build.
    it('keeps its kind set in lockstep with DocRef', () => {
        expectTypeOf<InjectPage['kind']>().toEqualTypeOf<DocRef['kind']>();
    });
    it('carries the spec subject matching each kind', () => {
        expectTypeOf<Extract<InjectPage, { kind: 'node' }>>().toHaveProperty('node');
        expectTypeOf<Extract<InjectPage, { kind: 'union' }>>().toHaveProperty('union');
        expectTypeOf<Extract<InjectPage, { kind: 'nestedUnion' }>>().toHaveProperty('nestedUnion');
        expectTypeOf<Extract<InjectPage, { kind: 'enumeration' }>>().toHaveProperty('enumeration');
        expectTypeOf<Extract<InjectPage, { kind: 'categoryIndex' }>>().toHaveProperty('category');
        expectTypeOf<Extract<InjectPage, { kind: 'rootIndex' }>>().toHaveProperty('spec');
    });
});
