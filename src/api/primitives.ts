/**
 * Type-expression primitives — the leaves of any attribute's type tree.
 *
 * Each function returns a frozen `TypeExpr` value. The encoded spec stores
 * those objects verbatim; codegen targets read them and emit native types.
 */

import type { IntegerWidth, LiteralValue, StringConstraint, TypeExpr } from './types';

// Addresses.

/**
 * A Solana address (a base58-encoded ed25519 public key on the wire).
 * Codegen targets emit a dedicated address type — e.g. `Address` in Rust —
 * rather than treating it as a generic string.
 */
export function address(): TypeExpr {
    return Object.freeze({ kind: 'address' as const });
}

// Strings.

/** Plain UTF-8 string. */
export function string(): TypeExpr {
    return Object.freeze({ kind: 'string' as const });
}

/**
 * A string that must be a valid IDL identifier: `[A-Za-z_][A-Za-z0-9_]*`.
 * No casing is mandated; renderers convert to their own conventions at
 * output time. Identifiers sharing a scope (a sibling set of the same
 * kind) must stay unique after lowercasing and stripping underscores, so
 * those conversions never collide. References match identifiers by exact
 * string comparison; the folding rule governs uniqueness only.
 */
export function stringIdentifier(): TypeExpr {
    return Object.freeze({ kind: 'string' as const, constraint: 'identifier' as const });
}

/**
 * A string that must be a chain of identifiers separated by single dots,
 * i.e. `identifier ("." identifier)*` — e.g. `i18n.es`, or just `anchor`
 * (a single identifier is a valid namespace). Used for plugin
 * namespaces, which match by exact string comparison.
 */
export function stringNamespace(): TypeExpr {
    return Object.freeze({ kind: 'string' as const, constraint: 'namespace' as const });
}

/**
 * A string that must be a valid path expression:
 * `first ( "." identifier | "[" integer "]" )*` where
 * `first := identifier | "[" integer "]"` — e.g. `amount`,
 * `fruits[0].banana`, or `[0].banana` against tuple-rooted data. Points
 * into nested data relative to an anchor that the carrying attribute
 * documents; indices are non-negative.
 */
export function stringPath(): TypeExpr {
    return Object.freeze({ kind: 'string' as const, constraint: 'path' as const });
}

/**
 * A string that must be a base-10 integer: `0|-?[1-9][0-9]*` — no leading
 * zeros, no negative zero, so every integer has exactly one spelling.
 * Keeps the full 64- and 128-bit ranges lossless through JSON transport.
 */
export function stringInteger(): TypeExpr {
    return Object.freeze({ kind: 'string' as const, constraint: 'integer' as const });
}

/**
 * A string that must be a decimal number matching
 * `-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?` — the JSON number
 * grammar — or one of the exact-case specials `NaN`, `Infinity`,
 * `-Infinity`. Makes float round-trips deterministic across serialisers.
 */
export function stringDecimal(): TypeExpr {
    return Object.freeze({ kind: 'string' as const, constraint: 'decimal' as const });
}

/** A string that must be a valid version (e.g. `"1.6.0"`). */
export function stringVersion(): TypeExpr {
    return Object.freeze({ kind: 'string' as const, constraint: 'version' as const });
}

/**
 * The version string of the surrounding Codama spec. Treat as a brand on
 * top of `stringVersion()` — the value is always pinned to the spec
 * version of the IDL. Codegen targets typically emit a literal
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

// Opaque data.

/**
 * An opaque, arbitrary JSON value carried verbatim through the encoded
 * spec. Its shape is intentionally not described by the spec — use it for
 * free-form, consumer-defined data such as a plugin payload. Codegen
 * targets emit their language's "any JSON" type: `unknown` in TypeScript,
 * `serde_json::Value` in Rust.
 */
export function json(): TypeExpr {
    return Object.freeze({ kind: 'json' as const });
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

/**
 * Reference to any node kind defined by the spec.
 *
 * Use this for slots that may carry an arbitrary node without
 * enumerating each kind by hand (the generic provide/inject pipe is
 * the motivating case). Codegen targets map this to their top-level
 * `Node` registry type.
 */
export function anyNode(): TypeExpr {
    return Object.freeze({ kind: 'anyNode' as const });
}

/** Reference to a named union declared via `defineUnion`. */
export function union(name: string): TypeExpr {
    return Object.freeze({ kind: 'union' as const, name });
}

// Re-exports for type ergonomics.
export type { IntegerWidth, LiteralValue, StringConstraint, TypeExpr };
