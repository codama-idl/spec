import { describe, expect, it } from 'vitest';

import { defineUnion, node, union } from '../src/api';

describe('defineUnion', () => {
    it('treats bare strings as node references', () => {
        const u = defineUnion('foo', { members: ['fooNode', 'barNode'] });
        expect(u.members).toEqual([
            { kind: 'node', name: 'fooNode' },
            { kind: 'node', name: 'barNode' },
        ]);
    });

    it('preserves nested union references structurally', () => {
        const u = defineUnion('composite', { members: [union('inner'), 'leafNode'] });
        expect(u.members).toEqual([
            { kind: 'union', name: 'inner' },
            { kind: 'node', name: 'leafNode' },
        ]);
    });

    it('accepts node(...) references directly', () => {
        const u = defineUnion('mixed', { members: [node('x'), 'y'] });
        expect(u.members).toEqual([
            { kind: 'node', name: 'x' },
            { kind: 'node', name: 'y' },
        ]);
    });

    it('rejects type expressions that are not node or union references', () => {
        expect(() => defineUnion('bad', { members: [{ kind: 'string' } as never] })).toThrow(
            /must be node kind strings/,
        );
    });

    it('freezes the union and each member', () => {
        const u = defineUnion('frozen', { members: [union('inner'), 'leafNode'] });
        expect(Object.isFrozen(u)).toBe(true);
        expect(Object.isFrozen(u.members)).toBe(true);
        for (const m of u.members) expect(Object.isFrozen(m)).toBe(true);
    });

    it('attaches optional docs', () => {
        const u = defineUnion('doc', { docs: ['A documented union.'], members: ['x'] });
        expect(u.docs).toEqual(['A documented union.']);
    });
});
