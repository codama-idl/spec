import { describe, expectTypeOf, it } from 'vitest';

import type { DocRef, DocRefKey } from '../../generators/docs/types';

describe('DocRef type', () => {
    it('exposes exactly the five known kinds', () => {
        expectTypeOf<DocRef['kind']>().toEqualTypeOf<
            'categoryIndex' | 'enumeration' | 'node' | 'rootIndex' | 'union'
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
