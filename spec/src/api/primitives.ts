/**
 * Type-expression primitives — the leaves of any attribute's type tree.
 *
 * Each function returns a frozen `TypeExpr` value. The encoded spec stores
 * those objects verbatim; codegen targets read them and emit native types.
 */

import type { FloatWidth, IntegerWidth, LiteralValue, StringConstraint, TypeExpr } from './types';

// Strings.

/** Plain UTF-8 string. */
export function string(): TypeExpr {
    return Object.freeze({ kind: 'string' as const });
}

/**
 * A string that must be a valid IDL identifier (stored canonically in
 * camelCase). Renderers may convert to other casings at output time.
 */
export function stringIdentifier(): TypeExpr {
    return Object.freeze({ kind: 'string' as const, constraint: 'identifier' as const });
}

/** A string that must be a valid version (e.g. `"1.6.0"`). */
export function stringVersion(): TypeExpr {
    return Object.freeze({ kind: 'string' as const, constraint: 'version' as const });
}

/**
 * The version string of the surrounding Codama spec. Treat as a brand on
 * top of `stringVersion()` — the value is always pinned to the spec
 * version of the IDL document. Codegen targets typically emit a literal
 * type or a constant.
 */
export function codamaVersion(): TypeExpr {
    return Object.freeze({ kind: 'codamaVersion' as const });
}

// Integers (explicit bit widths — no machine-dependent usize/isize).

const integer = (width: IntegerWidth): TypeExpr => Object.freeze({ kind: 'integer' as const, width });

export const u8 = (): TypeExpr => integer('u8');
export const u16 = (): TypeExpr => integer('u16');
export const u32 = (): TypeExpr => integer('u32');
export const u64 = (): TypeExpr => integer('u64');
export const u128 = (): TypeExpr => integer('u128');
export const i8 = (): TypeExpr => integer('i8');
export const i16 = (): TypeExpr => integer('i16');
export const i32 = (): TypeExpr => integer('i32');
export const i64 = (): TypeExpr => integer('i64');
export const i128 = (): TypeExpr => integer('i128');

// Floats.

const float = (width: FloatWidth): TypeExpr => Object.freeze({ kind: 'float' as const, width });

export const f32 = (): TypeExpr => float('f32');
export const f64 = (): TypeExpr => float('f64');

// Booleans and literals.

export function boolean(): TypeExpr {
    return Object.freeze({ kind: 'boolean' as const });
}

/** A single fixed value of a primitive type. */
export function literal(value: LiteralValue): TypeExpr {
    return Object.freeze({ kind: 'literal' as const, value });
}

/**
 * A heterogeneous union of literal values — for sum types like
 * `boolean | 'either'` that don't fit a string-only enumeration.
 *
 * Codegen targets render this as the appropriate language idiom (a literal
 * union in TS, a tagged enum with custom serde in Rust, etc.).
 */
export function literalUnion(...values: LiteralValue[]): TypeExpr {
    if (values.length === 0) {
        throw new Error('literalUnion: at least one value required');
    }
    const seen = new Set<LiteralValue>();
    for (const v of values) {
        if (seen.has(v)) {
            throw new Error(`literalUnion: duplicate value ${JSON.stringify(v)}`);
        }
        seen.add(v);
    }
    return Object.freeze({ kind: 'literalUnion' as const, values: Object.freeze([...values]) });
}

// Named references.

/** Reference to a named enumeration declared via `defineEnumeration`. */
export function enumeration(name: string): TypeExpr {
    return Object.freeze({ kind: 'enumeration' as const, name });
}

/** Reference to a named node declared via `defineNode`. */
export function node(name: string): TypeExpr {
    return Object.freeze({ kind: 'node' as const, name });
}

/** Reference to a named union declared via `defineUnion`. */
export function union(name: string): TypeExpr {
    return Object.freeze({ kind: 'union' as const, name });
}

/**
 * Reference to a named node, with implicit `NestedTypeNode<…>` wrapping.
 * The list of recognised wrapper nodes is supplied per spec major version;
 * see `v1/nestedTypeNodeWrappers.ts`.
 */
export function nestedTypeNode(name: string): TypeExpr {
    return Object.freeze({ kind: 'nestedTypeNode' as const, name });
}

// Re-exports for type ergonomics.
export type { FloatWidth, IntegerWidth, LiteralValue, StringConstraint, TypeExpr };
