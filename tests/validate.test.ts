import { describe, expect, it } from 'vitest';

import {
    anyNode,
    array,
    attribute,
    type CategorySpec,
    defineBase,
    defineCategory,
    defineEnumeration,
    defineNode,
    defineUnion,
    enumeration,
    isChildAttribute,
    json,
    node,
    optionalAttribute,
    type Spec,
    string,
    stringIdentifier,
    text,
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

    it('reports text-shaped attributes when textNode is not defined', () => {
        const errors = validate(
            baseSpec({
                nodes: [defineNode('aNode', { attributes: [attribute('message', text())] })],
            }),
        );
        expect(errors.some(e => e.includes('"aNode"') && e.includes('"textNode"'))).toBe(true);
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

describe('validate — base attributes', () => {
    const pluginsBase = () => defineBase({ attributes: [optionalAttribute('plugins', array(node('pluginNode')))] });

    it('accepts a base whose references resolve and whose names are free', () => {
        const errors = validate({
            ...baseSpec({ nodes: [defineNode('pluginNode', { attributes: [attribute('name', string())] })] }),
            base: pluginsBase(),
        });
        expect(errors).toEqual([]);
    });

    it('reports a base attribute referencing an undefined node', () => {
        const errors = validate({ ...baseSpec(), base: pluginsBase() });
        expect(errors.some(e => e.includes('Base attribute "plugins"') && e.includes('"pluginNode"'))).toBe(true);
    });

    it('reports a duplicate base attribute', () => {
        const errors = validate({
            ...baseSpec(),
            base: defineBase({ attributes: [attribute('docs', string()), attribute('docs', string())] }),
        });
        expect(errors.some(e => e.includes('Base attribute "docs"') && e.includes('more than once'))).toBe(true);
    });

    it('reports a node attribute colliding with a base attribute', () => {
        const errors = validate({
            ...baseSpec({
                nodes: [
                    defineNode('pluginNode', { attributes: [attribute('name', string())] }),
                    defineNode('aNode', { attributes: [attribute('plugins', string())] }),
                ],
            }),
            base: pluginsBase(),
        });
        expect(errors.some(e => e.includes('"aNode"') && e.includes('collides with a base attribute'))).toBe(true);
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

    it('classifies pure scalar attributes as data', () => {
        expect(isChildAttribute(string())).toBe(false);
        expect(isChildAttribute(u64())).toBe(false);
    });

    it('classifies an opaque json attribute as data', () => {
        expect(isChildAttribute(json())).toBe(false);
        expect(isChildAttribute(array(json()))).toBe(false);
    });
});
