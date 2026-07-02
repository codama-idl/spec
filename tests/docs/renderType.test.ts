import { describe, expect, it } from 'vitest';

import { markdownRenderer as markdown } from '../../src/docs/render/markdown';
import { isDocChild, renderType } from '../../src/docs/render/renderType';
import type { DocRef } from '../../src/docs/types';

function linkTo(ref: DocRef): string {
    return `#${ref.kind}:${'name' in ref ? ref.name : ''}`;
}

describe('renderType', () => {
    it('renders an entity reference as a code-wrapped link', () => {
        expect(renderType({ kind: 'union', name: 'typeNode' }, markdown, linkTo)).toBe('[`TypeNode`](#union:typeNode)');
    });
    it('renders an enumeration reference as a code-wrapped link', () => {
        expect(renderType({ kind: 'enumeration', name: 'numberFormat' }, markdown, linkTo)).toBe(
            '[`NumberFormat`](#enumeration:numberFormat)',
        );
    });
    it('renders an array as element[]', () => {
        expect(renderType({ kind: 'array', of: { kind: 'node', name: 'pdaNode' } }, markdown, linkTo)).toBe(
            '[`PdaNode`](#node:pdaNode)[]',
        );
    });
    it('renders a nestedUnion as Alias<Inner>, both linked', () => {
        expect(
            renderType({ kind: 'nestedUnion', alias: 'nestedTypeNode', name: 'structTypeNode' }, markdown, linkTo),
        ).toBe('[`NestedTypeNode`](#nestedUnion:nestedTypeNode)\\<[`StructTypeNode`](#node:structTypeNode)>');
    });
    it('renders primitives as code spans', () => {
        expect(renderType({ kind: 'integer', width: 'u64' }, markdown, linkTo)).toBe('`u64`');
        expect(renderType({ kind: 'float', width: 'f64' }, markdown, linkTo)).toBe('`f64`');
        expect(renderType({ kind: 'string', constraint: 'identifier' }, markdown, linkTo)).toBe('`CamelCaseString`');
        expect(renderType({ kind: 'string', constraint: 'version' }, markdown, linkTo)).toBe('`SemverString`');
        expect(renderType({ kind: 'string' }, markdown, linkTo)).toBe('`string`');
        expect(renderType({ kind: 'docs' }, markdown, linkTo)).toBe('`string[]`');
        expect(renderType({ kind: 'json' }, markdown, linkTo)).toBe('`Json`');
        expect(renderType({ kind: 'codamaVersion' }, markdown, linkTo)).toBe('`SemverString`');
    });
    it('renders a literal as its JSON-encoded value in a code span', () => {
        expect(renderType({ kind: 'literal', value: 42 }, markdown, linkTo)).toBe('`42`');
        expect(renderType({ kind: 'literal', value: 'abc' }, markdown, linkTo)).toBe('`"abc"`');
        expect(renderType({ kind: 'literal', value: true }, markdown, linkTo)).toBe('`true`');
    });
    it('renders a tuple as [A, B], recursing into each item', () => {
        expect(renderType({ kind: 'tuple', items: [{ kind: 'boolean' }, { kind: 'address' }] }, markdown, linkTo)).toBe(
            '[`boolean`, `Address`]',
        );
    });
    it('renders anyNode as a plain code span, not a link', () => {
        expect(renderType({ kind: 'anyNode' }, markdown, linkTo)).toBe('`anyNode`');
    });
    it('renders a literalUnion as a joined code span', () => {
        expect(renderType({ kind: 'literalUnion', values: ['a', 'b'] }, markdown, linkTo)).toBe('`"a" | "b"`');
    });
    it('parenthesizes a literalUnion inside an array so [] binds to the whole union', () => {
        // [] sits outside the code span, matching the array<primitive> style (e.g. `u64`[])
        expect(renderType({ kind: 'array', of: { kind: 'literalUnion', values: ['a', 'b'] } }, markdown, linkTo)).toBe(
            '`("a" | "b")`[]',
        );
    });
});

describe('isDocChild', () => {
    it('counts enumeration as a child (docs-local, unlike isChildAttribute) and primitives as data', () => {
        expect(isDocChild({ kind: 'enumeration', name: 'numberFormat' })).toBe(true);
        expect(isDocChild({ kind: 'node', name: 'pdaNode' })).toBe(true);
        expect(isDocChild({ kind: 'integer', width: 'u8' })).toBe(false);
    });
    it('counts anyNode as a child (via isChildAttribute)', () => {
        expect(isDocChild({ kind: 'anyNode' })).toBe(true);
    });
    it('recurses into arrays and tuples', () => {
        // an array of enumerations is a child (referencesEnumeration recurses into `of`)
        expect(isDocChild({ kind: 'array', of: { kind: 'enumeration', name: 'numberFormat' } })).toBe(true);
        // a tuple of primitives is data
        expect(isDocChild({ kind: 'tuple', items: [{ kind: 'boolean' }, { kind: 'integer', width: 'u8' }] })).toBe(
            false,
        );
    });
});
