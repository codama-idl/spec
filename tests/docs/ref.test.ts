import { describe, expect, expectTypeOf, it } from 'vitest';

import { displayName, docRefKey, refName } from '../../generators/docs/ref';
import type { DocRef, DocRefKey } from '../../generators/docs/types';

describe('ref helpers', () => {
    it('refName maps structural refs to sentinel names', () => {
        expect(refName({ kind: 'rootIndex' })).toBe('root');
        expect(refName({ kind: 'categoryIndex', category: 'pdaSeed' })).toBe('pdaSeed');
        expect(refName({ kind: 'node', name: 'pdaNode' })).toBe('pdaNode');
    });
    it('displayName pascal-cases the ref name', () => {
        expect(displayName({ kind: 'union', name: 'typeNode' })).toBe('TypeNode');
    });
    it.each<{ ref: DocRef; expected: DocRefKey }>([
        { ref: { kind: 'node', name: 'typeNode' }, expected: 'node:typeNode' },
        { ref: { kind: 'union', name: 'typeNode' }, expected: 'union:typeNode' },
        { ref: { kind: 'nestedUnion', name: 'typeNode' }, expected: 'nestedUnion:typeNode' },
        { ref: { kind: 'enumeration', name: 'typeNode' }, expected: 'enumeration:typeNode' },
        { ref: { kind: 'categoryIndex', category: 'typeNode' }, expected: 'categoryIndex:typeNode' },
        { ref: { kind: 'rootIndex' }, expected: 'rootIndex:root' },
    ])('docRefKey builds a canonical key -> $expected', ({ ref, expected }) => {
        expect(docRefKey(ref)).toBe(expected);
    });
});

describe('ref types', () => {
    it('docRefKey returns the canonical DocRefKey template type, not a widened string', () => {
        expectTypeOf(docRefKey).returns.toEqualTypeOf<DocRefKey>();
    });
    it('name helpers return plain strings', () => {
        expectTypeOf(refName).returns.toBeString();
        expectTypeOf(displayName).returns.toBeString();
    });
});
