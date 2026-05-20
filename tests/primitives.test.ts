import { describe, expect, it } from 'vitest';

import {
    address,
    boolean,
    codamaVersion,
    enumeration,
    f32,
    f64,
    i8,
    i16,
    i32,
    i64,
    i128,
    literal,
    literalUnion,
    nestedUnion,
    node,
    string,
    stringIdentifier,
    stringVersion,
    u8,
    u16,
    u32,
    u64,
    u128,
    union,
} from '../src/api';

describe('address primitive', () => {
    it('returns the address kind', () => {
        expect(address()).toEqual({ kind: 'address' });
    });
    it('freezes the result', () => {
        expect(Object.isFrozen(address())).toBe(true);
    });
});

describe('string primitives', () => {
    it('returns plain string with no constraint', () => {
        expect(string()).toEqual({ kind: 'string' });
    });
    it('returns identifier-constrained string', () => {
        expect(stringIdentifier()).toEqual({ kind: 'string', constraint: 'identifier' });
    });
    it('returns semver-constrained string', () => {
        expect(stringVersion()).toEqual({ kind: 'string', constraint: 'version' });
    });
    it('freezes returned values', () => {
        expect(Object.isFrozen(string())).toBe(true);
        expect(Object.isFrozen(stringIdentifier())).toBe(true);
    });
});

describe('integer primitives', () => {
    it('produces every supported width', () => {
        expect(u8()).toEqual({ kind: 'integer', width: 'u8' });
        expect(u16()).toEqual({ kind: 'integer', width: 'u16' });
        expect(u32()).toEqual({ kind: 'integer', width: 'u32' });
        expect(u64()).toEqual({ kind: 'integer', width: 'u64' });
        expect(u128()).toEqual({ kind: 'integer', width: 'u128' });
        expect(i8()).toEqual({ kind: 'integer', width: 'i8' });
        expect(i16()).toEqual({ kind: 'integer', width: 'i16' });
        expect(i32()).toEqual({ kind: 'integer', width: 'i32' });
        expect(i64()).toEqual({ kind: 'integer', width: 'i64' });
        expect(i128()).toEqual({ kind: 'integer', width: 'i128' });
    });
    it('freezes returned values', () => {
        expect(Object.isFrozen(u64())).toBe(true);
    });
});

describe('float primitives', () => {
    it('produces both supported widths', () => {
        expect(f32()).toEqual({ kind: 'float', width: 'f32' });
        expect(f64()).toEqual({ kind: 'float', width: 'f64' });
    });
});

describe('boolean primitive', () => {
    it('returns the boolean kind', () => {
        expect(boolean()).toEqual({ kind: 'boolean' });
    });
});

describe('literal', () => {
    it('wraps each primitive value type', () => {
        expect(literal('hello')).toEqual({ kind: 'literal', value: 'hello' });
        expect(literal(42)).toEqual({ kind: 'literal', value: 42 });
        expect(literal(true)).toEqual({ kind: 'literal', value: true });
    });
});

describe('literalUnion', () => {
    it('accepts mixed primitive types', () => {
        expect(literalUnion(true, false, 'either')).toEqual({
            kind: 'literalUnion',
            values: [true, false, 'either'],
        });
    });
    it('rejects empty input', () => {
        expect(() => literalUnion()).toThrow(/at least one value required/);
    });
    it('rejects duplicates', () => {
        expect(() => literalUnion('a', 'a')).toThrow(/duplicate value/);
        expect(() => literalUnion(1, 1)).toThrow(/duplicate value/);
    });
    it('freezes the produced values array', () => {
        const set = literalUnion('a', 'b');
        expect(Object.isFrozen(set)).toBe(true);
        if (set.kind === 'literalUnion') {
            expect(Object.isFrozen(set.values)).toBe(true);
        }
    });
});

describe('named references', () => {
    it('builds enumeration / node / union / nestedUnion references', () => {
        expect(enumeration('endianness')).toEqual({ kind: 'enumeration', name: 'endianness' });
        expect(node('accountNode')).toEqual({ kind: 'node', name: 'accountNode' });
        expect(union('typeNode')).toEqual({ kind: 'union', name: 'typeNode' });
        expect(nestedUnion('nestedTypeNode', 'structTypeNode')).toEqual({
            kind: 'nestedUnion',
            alias: 'nestedTypeNode',
            name: 'structTypeNode',
        });
    });
});

describe('codamaVersion', () => {
    it('returns the codamaVersion kind', () => {
        expect(codamaVersion()).toEqual({ kind: 'codamaVersion' });
    });
    it('freezes the result', () => {
        expect(Object.isFrozen(codamaVersion())).toBe(true);
    });
});
