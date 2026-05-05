import { describe, expect, it } from 'vitest';

import { buildLayout } from '../src/layout';
import { renderTypeExpr } from '../src/renderTypeExpr';
import {
    array,
    boolean,
    codamaVersion,
    enumeration,
    literal,
    literalUnion,
    microSpec,
    nestedTypeNode,
    node,
    string,
    stringIdentifier,
    stringVersion,
    u32,
    union,
} from './_fixtures';

const spec = microSpec();
const layout = buildLayout(spec);
// `wrappingTypeNode` is top-level in `microSpec` — its file lands at the
// PascalCase root path `WrappingTypeNode`, matching what `buildLayout`
// produces and what the renderer compares `currentLocation` against.
const ctx = { layout, currentLocation: 'WrappingTypeNode' };

describe('renderTypeExpr — leaves', () => {
    it('renders plain string', () => {
        expect(renderTypeExpr(string(), ctx).content).toBe('string');
    });
    it('renders integer as number', () => {
        expect(renderTypeExpr(u32(), ctx).content).toBe('number');
    });
    it('renders boolean', () => {
        expect(renderTypeExpr(boolean(), ctx).content).toBe('boolean');
    });
    it('renders string literal', () => {
        expect(renderTypeExpr(literal('codama'), ctx).content).toBe("'codama'");
    });
    it('renders boolean literal', () => {
        expect(renderTypeExpr(literal(true), ctx).content).toBe('true');
    });
});

describe('renderTypeExpr — literalUnion', () => {
    it('joins with " | "', () => {
        expect(renderTypeExpr(literalUnion(true, false, 'either'), ctx).content).toBe("true | false | 'either'");
    });
});

describe('renderTypeExpr — branded strings', () => {
    it('emits CamelCaseString for stringIdentifier', () => {
        const result = renderTypeExpr(stringIdentifier(), ctx);
        expect(result.content).toBe('CamelCaseString');
        expect(result.imports.size).toBe(1);
    });
    it('emits Version for stringVersion', () => {
        const result = renderTypeExpr(stringVersion(), ctx);
        expect(result.content).toBe('Version');
    });
    it('emits CodamaVersion for codamaVersion', () => {
        const result = renderTypeExpr(codamaVersion(), ctx);
        expect(result.content).toBe('CodamaVersion');
    });
});

describe('renderTypeExpr — references', () => {
    it('renders enumeration references and collects an import', () => {
        const result = renderTypeExpr(enumeration('Endianness'), ctx);
        expect(result.content).toBe('Endianness');
        expect([...result.imports.keys()]).toEqual(['./shared/endianness']);
    });
    it('renders node references with PascalCase identifiers', () => {
        const result = renderTypeExpr(node('innerTypeNode'), ctx);
        expect(result.content).toBe('InnerTypeNode');
        expect([...result.imports.keys()]).toEqual(['./InnerTypeNode']);
    });
    it('renders union references', () => {
        const result = renderTypeExpr(union('TypeNode'), ctx);
        expect(result.content).toBe('TypeNode');
        // TypeNode union lives in typeNodes/, current location is WrappingTypeNode (top-level).
        expect([...result.imports.keys()]).toEqual(['./typeNodes/TypeNode']);
    });
    it('skips imports when the reference is in the current file', () => {
        const result = renderTypeExpr(node('wrappingTypeNode'), { ...ctx, currentLocation: 'WrappingTypeNode' });
        expect(result.content).toBe('WrappingTypeNode');
        expect(result.imports.size).toBe(0);
    });
});

describe('renderTypeExpr — compounds', () => {
    it('renders array(T) as T[]', () => {
        expect(renderTypeExpr(array(boolean()), ctx).content).toBe('boolean[]');
    });
    it('handles nested array types', () => {
        expect(renderTypeExpr(array(array(string())), ctx).content).toBe('string[][]');
    });
    it('parenthesises an inline literal-union array element', () => {
        // Without parens this would be `true | false[]`, i.e. `true | (false[])`.
        expect(renderTypeExpr(array(literalUnion(true, false)), ctx).content).toBe('(true | false)[]');
    });
    it('renders nestedTypeNode wrapping with the typeNodes/NestedTypeNode location', () => {
        const result = renderTypeExpr(nestedTypeNode('innerTypeNode'), ctx);
        expect(result.content).toBe('NestedTypeNode<InnerTypeNode>');
        expect([...result.imports.keys()].sort()).toEqual(['./InnerTypeNode', './typeNodes/NestedTypeNode']);
    });
});

describe('renderTypeExpr — string literal escaping', () => {
    it('escapes single quotes inside string literals', () => {
        expect(renderTypeExpr(literal("it's"), ctx).content).toBe("'it\\'s'");
    });
    it('escapes backslashes inside string literals', () => {
        expect(renderTypeExpr(literal('a\\b'), ctx).content).toBe("'a\\\\b'");
    });
    it('escapes newlines and tabs inside string literals', () => {
        expect(renderTypeExpr(literal('a\nb\tc'), ctx).content).toBe("'a\\nb\\tc'");
    });
    it('escapes line and paragraph separators', () => {
        expect(renderTypeExpr(literal('a\u2028b\u2029c'), ctx).content).toBe("'a\\u2028b\\u2029c'");
    });
});
