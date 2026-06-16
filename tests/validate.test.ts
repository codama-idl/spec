import { describe, expect, it } from 'vitest';

import {
    anyNode,
    array,
    attribute,
    type CategorySpec,
    defineCategory,
    defineEnumeration,
    defineNestedUnion,
    defineNode,
    defineUnion,
    enumeration,
    isChildAttribute,
    nestedUnion,
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

const baseSpec = (overrides: Partial<CategorySpec> = {}): Spec => ({
    version: '1.0.0',
    categories: [
        defineCategory('topLevel', {
            enumerations: overrides.enumerations,
            nestedUnions: overrides.nestedUnions,
            nodes: overrides.nodes,
            unions: overrides.unions,
        }),
    ],
});

describe('validate — references', () => {
    it('reports a missing node reference with location', () => {
        const errors = validate(
            baseSpec({
                nodes: [defineNode('aNode', { attributes: [attribute('other', node('missingNode'))] })],
            }),
        );
        expect(errors.some(e => e.includes('"aNode"') && e.includes('"missingNode"'))).toBe(true);
    });

    it('reports a missing union reference', () => {
        const errors = validate(
            baseSpec({
                nodes: [defineNode('aNode', { attributes: [attribute('v', union('noSuchUnion'))] })],
            }),
        );
        expect(errors.some(e => e.includes('noSuchUnion'))).toBe(true);
    });

    it('reports a missing enumeration reference', () => {
        const errors = validate(
            baseSpec({
                nodes: [defineNode('aNode', { attributes: [attribute('v', enumeration('noSuchEnum'))] })],
            }),
        );
        expect(errors.some(e => e.includes('noSuchEnum'))).toBe(true);
    });

    it('reports a missing nestedUnion node reference', () => {
        const errors = validate(
            baseSpec({
                nestedUnions: [
                    defineNestedUnion('wrap', { base: union('anyUnion'), wrappers: ['definedWrapperNode'] }),
                ],
                nodes: [
                    defineNode('definedWrapperNode', { attributes: [] }),
                    defineNode('aNode', { attributes: [attribute('v', nestedUnion('wrap', 'ghostNode'))] }),
                ],
                unions: [defineUnion('anyUnion', { members: ['definedWrapperNode'] })],
            }),
        );
        expect(errors.some(e => e.includes('ghostNode'))).toBe(true);
    });

    it('reports an unknown nestedUnion alias', () => {
        const errors = validate(
            baseSpec({
                nodes: [defineNode('aNode', { attributes: [attribute('v', nestedUnion('noSuch', 'aNode'))] })],
            }),
        );
        expect(errors.some(e => e.includes('noSuch'))).toBe(true);
    });

    it('walks into compound types when checking refs', () => {
        const errors = validate(
            baseSpec({
                nodes: [
                    defineNode('aNode', {
                        attributes: [optionalAttribute('items', array(node('missingNode')))],
                    }),
                ],
            }),
        );
        expect(errors.some(e => e.includes('missingNode'))).toBe(true);
    });

    it('walks into tuple slots', () => {
        const errors = validate(
            baseSpec({
                nodes: [
                    defineNode('aNode', {
                        attributes: [attribute('v', tuple(string(), node('missingNode')))],
                    }),
                ],
            }),
        );
        expect(errors.some(e => e.includes('missingNode'))).toBe(true);
    });

    it('passes a coherent micro-spec', () => {
        const innerNode = defineNode('innerNode', { attributes: [attribute('name', stringIdentifier())] });
        const u = defineUnion('inner', { members: ['innerNode'] });
        const outerNode = defineNode('outerNode', { attributes: [attribute('inner', union('inner'))] });
        const errors = validate(baseSpec({ nodes: [innerNode, outerNode], unions: [u] }));
        expect(errors).toEqual([]);
    });
});

describe('validate — naming', () => {
    it('rejects node kinds that violate the camelCase ...Node convention', () => {
        const errors = validate(baseSpec({ nodes: [defineNode('NotCamelNode', { attributes: [] })] }));
        expect(errors.some(e => e.includes('NotCamelNode') && e.includes('camelCase'))).toBe(true);
    });

    it('rejects node kinds without a Node suffix', () => {
        const errors = validate(baseSpec({ nodes: [defineNode('something', { attributes: [] })] }));
        expect(errors.some(e => e.includes('something'))).toBe(true);
    });

    it('rejects union names that violate the camelCase convention', () => {
        const errors = validate(baseSpec({ unions: [defineUnion('PascalCase', { members: ['aNode'] })] }));
        expect(errors.some(e => e.includes('"PascalCase"') && e.includes('camelCase'))).toBe(true);
    });

    it('rejects enumeration names that violate the camelCase convention', () => {
        const errors = validate(
            baseSpec({ enumerations: [defineEnumeration('PascalCase', { variants: [variant('a')] })] }),
        );
        expect(errors.some(e => e.includes('"PascalCase"') && e.includes('camelCase'))).toBe(true);
    });

    it('rejects nested union names that violate the camelCase convention', () => {
        const wrapper = defineNode('wrapperNode', { attributes: [] });
        const errors = validate(
            baseSpec({
                nestedUnions: [defineNestedUnion('PascalCase', { base: union('inner'), wrappers: ['wrapperNode'] })],
                nodes: [wrapper],
                unions: [defineUnion('inner', { members: ['wrapperNode'] })],
            }),
        );
        expect(errors.some(e => e.includes('"PascalCase"') && e.includes('camelCase'))).toBe(true);
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
        const errors = validate(baseSpec({ nodes: [corrupted] }));
        expect(errors.some(e => e.includes('"x"') && e.includes('more than once'))).toBe(true);
    });
});

describe('validate — name collisions', () => {
    it('emits a single error per name registered in multiple registries', () => {
        const errors = validate(
            baseSpec({
                nodes: [defineNode('foo', { attributes: [] })],
                unions: [defineUnion('foo', { members: ['bar'] })],
            }),
        );
        const collisions = errors.filter(e => e.startsWith('Name "foo" is registered'));
        expect(collisions.length).toBe(1);
        expect(collisions[0]).toContain('1 node');
        expect(collisions[0]).toContain('1 union');
    });

    it('counts multiple registrations of the same kind', () => {
        const errors = validate(
            baseSpec({
                nodes: [defineNode('aNode', { attributes: [] }), defineNode('aNode', { attributes: [] })],
            }),
        );
        const collisions = errors.filter(e => e.startsWith('Name "aNode" is registered'));
        expect(collisions.length).toBe(1);
        expect(collisions[0]).toContain('2 nodes');
    });
});

describe('validate — unions', () => {
    it('rejects empty unions', () => {
        const u = defineUnion('empty', { members: [] });
        const errors = validate(baseSpec({ unions: [u] }));
        expect(errors.some(e => e.includes('"empty"') && e.includes('no members'))).toBe(true);
    });

    it('rejects duplicate union members', () => {
        const u = defineUnion('u', { members: ['x', 'x'] });
        const errors = validate(
            baseSpec({
                nodes: [defineNode('xNode', { attributes: [] })],
                unions: [u],
            }),
        );
        expect(errors.some(e => e.includes('"u"') && e.includes('more than once'))).toBe(true);
    });
});

describe('validate — nestedUnions', () => {
    it('rejects wrapper kinds that are not defined nodes', () => {
        const errors = validate(
            baseSpec({
                nestedUnions: [defineNestedUnion('wrap', { base: union('anyUnion'), wrappers: ['ghostWrapperNode'] })],
            }),
        );
        expect(errors.some(e => e.includes('ghostWrapperNode'))).toBe(true);
    });

    it('accepts wrapper kinds that resolve to defined nodes', () => {
        const wrapper = defineNode('wrapperNode', { attributes: [] });
        const errors = validate(
            baseSpec({
                nestedUnions: [defineNestedUnion('wrap', { base: union('anyUnion'), wrappers: ['wrapperNode'] })],
                nodes: [wrapper],
                unions: [defineUnion('anyUnion', { members: ['wrapperNode'] })],
            }),
        );
        expect(errors).toEqual([]);
    });
});

describe('validate — categories', () => {
    it('rejects duplicate category names', () => {
        const errors = validate({
            version: '1.0.0',
            categories: [defineCategory('shared'), defineCategory('shared')],
        });
        expect(errors.some(e => e.includes('"shared"') && e.includes('more than once'))).toBe(true);
    });

    it('detects collisions across different categories', () => {
        const errors = validate({
            version: '1.0.0',
            categories: [
                defineCategory('a', { nodes: [defineNode('foo', { attributes: [] })] }),
                defineCategory('b', { nodes: [defineNode('foo', { attributes: [] })] }),
            ],
        });
        const collisions = errors.filter(e => e.includes('"foo"') && e.includes('registered'));
        expect(collisions.length).toBe(1);
    });
});

describe('validate — enumerations', () => {
    it('accepts a valid enumeration referenced by a node', () => {
        const enumSpec = defineEnumeration('e', { variants: [variant('a'), variant('b')] });
        const xNode = defineNode('xNode', { attributes: [attribute('v', enumeration('e'))] });
        const errors = validate(baseSpec({ enumerations: [enumSpec], nodes: [xNode] }));
        expect(errors).toEqual([]);
    });
});

describe('isChildAttribute', () => {
    it('classifies refs as children', () => {
        expect(isChildAttribute(node('x'))).toBe(true);
        expect(isChildAttribute(union('y'))).toBe(true);
        expect(isChildAttribute(nestedUnion('wrap', 'z'))).toBe(true);
    });

    it('classifies anyNode as a child', () => {
        expect(isChildAttribute(anyNode())).toBe(true);
    });

    it('classifies array-wrapped refs as children', () => {
        expect(isChildAttribute(array(union('y')))).toBe(true);
    });

    it('classifies an array of anyNode as a child', () => {
        expect(isChildAttribute(array(anyNode()))).toBe(true);
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
