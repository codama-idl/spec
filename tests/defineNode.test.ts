import { describe, expect, it } from 'vitest';

import { attribute, defineNode, optionalAttribute, string, stringIdentifier, u64 } from '../src/api';

describe('attribute and optionalAttribute', () => {
    it('produces a frozen AttributeSpec from `attribute`', () => {
        const a = attribute('name', stringIdentifier());
        expect(Object.isFrozen(a)).toBe(true);
        expect(a).toEqual({ name: 'name', type: { kind: 'string', constraint: 'identifier' } });
    });

    it('omits docs when not provided', () => {
        expect(attribute('x', string())).not.toHaveProperty('docs');
    });

    it('omits optional flag when not provided', () => {
        expect(attribute('x', string())).not.toHaveProperty('optional');
    });

    it('attaches docs when provided', () => {
        expect(attribute('x', string(), { docs: ['hello'] })).toEqual({
            name: 'x',
            type: { kind: 'string' },
            docs: ['hello'],
        });
    });

    it('marks optional when `optional: true`', () => {
        expect(attribute('x', string(), { optional: true })).toEqual({
            name: 'x',
            type: { kind: 'string' },
            optional: true,
        });
    });

    it('does not mark optional when `optional: false`', () => {
        expect(attribute('x', string(), { optional: false })).not.toHaveProperty('optional');
    });

    it('optionalAttribute is sugar for `optional: true`', () => {
        expect(optionalAttribute('x', string(), { docs: ['hi'] })).toEqual({
            name: 'x',
            type: { kind: 'string' },
            optional: true,
            docs: ['hi'],
        });
    });
});

describe('defineNode', () => {
    it('produces a frozen NodeSpec preserving attribute order', () => {
        const node = defineNode('myNode', {
            attributes: [
                attribute('name', stringIdentifier()),
                optionalAttribute('size', u64()),
                attribute('description', string()),
            ],
        });
        expect(Object.isFrozen(node)).toBe(true);
        expect(node.kind).toBe('myNode');
        expect(node.attributes.map(a => a.name)).toEqual(['name', 'size', 'description']);
    });

    it('attaches optional node-level docs', () => {
        const n = defineNode('docNode', {
            docs: ['A documented node.'],
            attributes: [attribute('v', string())],
        });
        expect(n.docs).toEqual(['A documented node.']);
    });

    it('omits node docs when absent', () => {
        const n = defineNode('plainNode', { attributes: [attribute('v', string())] });
        expect(n).not.toHaveProperty('docs');
    });

    it('freezes each AttributeSpec and the attributes array', () => {
        const n = defineNode('frozenAttrs', { attributes: [attribute('v', string())] });
        for (const a of n.attributes) {
            expect(Object.isFrozen(a)).toBe(true);
        }
        expect(Object.isFrozen(n.attributes)).toBe(true);
    });

    it('defaults examples to a frozen empty array', () => {
        const n = defineNode('exampleless', { attributes: [attribute('v', string())] });
        expect(n.examples).toEqual([]);
        expect(Object.isFrozen(n.examples)).toBe(true);
    });

    it('preserves explicit examples', () => {
        const n = defineNode('exampled', {
            attributes: [attribute('v', string())],
            examples: [{ v: 'hello' }],
        });
        expect(n.examples).toEqual([{ v: 'hello' }]);
        expect(Object.isFrozen(n.examples)).toBe(true);
    });
});
