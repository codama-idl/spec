import { describe, expect, it } from 'vitest';

import {
    array,
    attribute,
    defineEnumeration,
    defineNode,
    defineUnion,
    enumeration,
    isChildAttribute,
    nestedTypeNode,
    node,
    optionalAttribute,
    type Spec,
    string,
    stringIdentifier,
    tuple,
    u64,
    union,
    validate,
    variant,
} from '../src/api';

const baseSpec = (): Spec => ({
    version: '1.0.0',
    enumerations: [],
    nodes: [],
    unions: [],
    nestedTypeNodeWrappers: [],
});

describe('validate — references', () => {
    it('reports a missing node reference with location', () => {
        const errors = validate({
            ...baseSpec(),
            nodes: [defineNode('aNode', { attributes: [attribute('other', node('missingNode'))] })],
        });
        expect(errors.some(e => e.includes('"aNode"') && e.includes('"missingNode"'))).toBe(true);
    });

    it('reports a missing union reference', () => {
        const errors = validate({
            ...baseSpec(),
            nodes: [defineNode('aNode', { attributes: [attribute('v', union('NoSuchUnion'))] })],
        });
        expect(errors.some(e => e.includes('NoSuchUnion'))).toBe(true);
    });

    it('reports a missing enumeration reference', () => {
        const errors = validate({
            ...baseSpec(),
            nodes: [defineNode('aNode', { attributes: [attribute('v', enumeration('NoSuchEnum'))] })],
        });
        expect(errors.some(e => e.includes('NoSuchEnum'))).toBe(true);
    });

    it('reports a missing nestedTypeNode reference', () => {
        const errors = validate({
            ...baseSpec(),
            nodes: [defineNode('aNode', { attributes: [attribute('v', nestedTypeNode('ghostNode'))] })],
        });
        expect(errors.some(e => e.includes('ghostNode'))).toBe(true);
    });

    it('walks into compound types when checking refs', () => {
        const errors = validate({
            ...baseSpec(),
            nodes: [
                defineNode('aNode', {
                    attributes: [optionalAttribute('items', array(node('missingNode')))],
                }),
            ],
        });
        expect(errors.some(e => e.includes('missingNode'))).toBe(true);
    });

    it('walks into tuple slots', () => {
        const errors = validate({
            ...baseSpec(),
            nodes: [
                defineNode('aNode', {
                    attributes: [attribute('v', tuple(string(), node('missingNode')))],
                }),
            ],
        });
        expect(errors.some(e => e.includes('missingNode'))).toBe(true);
    });

    it('passes a coherent micro-spec', () => {
        const innerNode = defineNode('innerNode', { attributes: [attribute('name', stringIdentifier())] });
        const u = defineUnion('Inner', { members: ['innerNode'] });
        const outerNode = defineNode('outerNode', { attributes: [attribute('inner', union('Inner'))] });
        const errors = validate({ ...baseSpec(), nodes: [innerNode, outerNode], unions: [u] });
        expect(errors).toEqual([]);
    });
});

describe('validate — naming', () => {
    it('rejects node kinds that violate the camelCase ...Node convention', () => {
        const errors = validate({
            ...baseSpec(),
            nodes: [defineNode('NotCamelNode', { attributes: [] })],
        });
        expect(errors.some(e => e.includes('NotCamelNode') && e.includes('camelCase'))).toBe(true);
    });

    it('rejects node kinds without a Node suffix', () => {
        const errors = validate({
            ...baseSpec(),
            nodes: [defineNode('something', { attributes: [] })],
        });
        expect(errors.some(e => e.includes('something'))).toBe(true);
    });

    it('detects duplicate attribute names within a node', () => {
        // We deliberately bypass the helper and craft an array with a
        // repeated `name` to exercise the validator's per-node attribute
        // uniqueness check.
        const corrupted = {
            kind: 'aNode',
            attributes: [
                { name: 'x', type: string() },
                { name: 'x', type: string() },
            ],
            examples: [],
        };
        const errors = validate({ ...baseSpec(), nodes: [corrupted] });
        expect(errors.some(e => e.includes('"x"') && e.includes('more than once'))).toBe(true);
    });
});

describe('validate — name collisions', () => {
    it('emits a single error per name registered in multiple registries', () => {
        const errors = validate({
            ...baseSpec(),
            nodes: [defineNode('foo', { attributes: [] })],
            unions: [defineUnion('foo', { members: ['bar'] })],
        });
        const collisions = errors.filter(e => e.startsWith('Name "foo" is registered'));
        expect(collisions.length).toBe(1);
        expect(collisions[0]).toContain('1 node');
        expect(collisions[0]).toContain('1 union');
    });

    it('counts multiple registrations of the same kind', () => {
        const errors = validate({
            ...baseSpec(),
            nodes: [defineNode('aNode', { attributes: [] }), defineNode('aNode', { attributes: [] })],
        });
        const collisions = errors.filter(e => e.startsWith('Name "aNode" is registered'));
        expect(collisions.length).toBe(1);
        expect(collisions[0]).toContain('2 nodes');
    });
});

describe('validate — unions', () => {
    it('rejects empty unions', () => {
        const u = defineUnion('Empty', { members: [] });
        const errors = validate({ ...baseSpec(), unions: [u] });
        expect(errors.some(e => e.includes('"Empty"') && e.includes('no members'))).toBe(true);
    });

    it('rejects duplicate union members', () => {
        const u = defineUnion('U', { members: ['x', 'x'] });
        const errors = validate({
            ...baseSpec(),
            nodes: [defineNode('xNode', { attributes: [] })],
            unions: [u],
        });
        expect(errors.some(e => e.includes('"U"') && e.includes('more than once'))).toBe(true);
    });
});

describe('validate — nestedTypeNodeWrappers', () => {
    it('rejects wrapper names that are not defined nodes', () => {
        const errors = validate({ ...baseSpec(), nestedTypeNodeWrappers: ['ghostWrapperNode'] });
        expect(errors.some(e => e.includes('ghostWrapperNode'))).toBe(true);
    });

    it('accepts wrapper names that resolve to defined nodes', () => {
        const wrapper = defineNode('wrapperNode', { attributes: [] });
        const errors = validate({
            ...baseSpec(),
            nodes: [wrapper],
            nestedTypeNodeWrappers: ['wrapperNode'],
        });
        expect(errors).toEqual([]);
    });
});

describe('validate — enumerations', () => {
    it('accepts a valid enumeration referenced by a node', () => {
        const enumSpec = defineEnumeration('E', { variants: [variant('a'), variant('b')] });
        const node = defineNode('xNode', { attributes: [attribute('v', enumeration('E'))] });
        const errors = validate({ ...baseSpec(), enumerations: [enumSpec], nodes: [node] });
        expect(errors).toEqual([]);
    });
});

describe('isChildAttribute', () => {
    it('classifies refs as children', () => {
        expect(isChildAttribute(node('x'))).toBe(true);
        expect(isChildAttribute(union('Y'))).toBe(true);
        expect(isChildAttribute(nestedTypeNode('z'))).toBe(true);
    });

    it('classifies array-wrapped refs as children', () => {
        expect(isChildAttribute(array(union('Y')))).toBe(true);
    });

    it('classifies a tuple containing a child as a child', () => {
        expect(isChildAttribute(tuple(string(), node('x')))).toBe(true);
    });

    it('classifies pure scalar attributes as data', () => {
        expect(isChildAttribute(string())).toBe(false);
        expect(isChildAttribute(u64())).toBe(false);
        expect(isChildAttribute(tuple(string(), u64()))).toBe(false);
    });
});
