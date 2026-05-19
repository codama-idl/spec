import { describe, expect, it } from 'vitest';

import { array, boolean, string, tuple, u32 } from '../src/api';

describe('array', () => {
    it('wraps an inner type expression', () => {
        expect(array(string())).toEqual({
            kind: 'array',
            of: { kind: 'string' },
        });
    });
    it('freezes the result', () => {
        expect(Object.isFrozen(array(boolean()))).toBe(true);
    });
});

describe('tuple', () => {
    it('captures positional slots', () => {
        const t = tuple(u32(), string(), boolean());
        expect(t).toEqual({
            kind: 'tuple',
            items: [{ kind: 'integer', width: 'u32' }, { kind: 'string' }, { kind: 'boolean' }],
        });
    });
    it('freezes the items array', () => {
        const t = tuple(u32(), string());
        if (t.kind === 'tuple') {
            expect(Object.isFrozen(t.items)).toBe(true);
        }
    });
});
