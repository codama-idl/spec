import { describe, expect, it } from 'vitest';

import { array, boolean, string } from '../src/api';

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
