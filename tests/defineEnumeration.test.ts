import { describe, expect, it } from 'vitest';

import { defineEnumeration, variant } from '../src/api';

describe('variant', () => {
    it('produces a frozen variant with no docs by default', () => {
        const v = variant('be');
        expect(Object.isFrozen(v)).toBe(true);
        expect(v).toEqual({ name: 'be' });
    });

    it('attaches docs when provided', () => {
        expect(variant('be', { docs: ['Big-endian.'] })).toEqual({ name: 'be', docs: ['Big-endian.'] });
    });
});

describe('defineEnumeration', () => {
    it('produces a frozen EnumerationSpec', () => {
        const e = defineEnumeration('Endianness', {
            variants: [variant('be'), variant('le')],
        });
        expect(Object.isFrozen(e)).toBe(true);
        expect(Object.isFrozen(e.variants)).toBe(true);
        expect(e.name).toBe('Endianness');
        expect(e.variants).toEqual([{ name: 'be' }, { name: 'le' }]);
    });

    it('attaches optional docs', () => {
        const e = defineEnumeration('E', { docs: ['docs'], variants: [variant('a')] });
        expect(e.docs).toEqual(['docs']);
    });

    it('rejects an empty variants list', () => {
        expect(() => defineEnumeration('Empty', { variants: [] })).toThrow(/must be non-empty/);
    });

    it('rejects duplicate variant names', () => {
        expect(() => defineEnumeration('Dup', { variants: [variant('a'), variant('b'), variant('a')] })).toThrow(
            /duplicate variant "a"/,
        );
    });

    it('preserves per-variant docs', () => {
        const e = defineEnumeration('E', {
            variants: [variant('a', { docs: ['A.'] }), variant('b', { docs: ['B.'] })],
        });
        expect(e.variants).toEqual([
            { name: 'a', docs: ['A.'] },
            { name: 'b', docs: ['B.'] },
        ]);
    });
});
