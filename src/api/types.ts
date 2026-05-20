/**
 * Public types describing the shape of a Codama spec.
 *
 * These types are version-agnostic — the same shape describes a Codama v1
 * spec, a v2 spec, etc. Versioned content (concrete nodes, enumerations,
 * unions, categories) lives under `spec/src/v<n>/`. The first half of
 * this file declares the type-expression vocabulary; the second half
 * declares the spec-content shape (attributes, nodes, unions,
 * enumerations, nested unions, categories).
 */

export type IntegerWidth = 'i8' | 'i16' | 'i32' | 'i64' | 'i128' | 'u8' | 'u16' | 'u32' | 'u64' | 'u128';

export type FloatWidth = 'f32' | 'f64';

export type StringConstraint = 'identifier' | 'version';

/** A primitive literal value usable inside a `literalUnion`. */
export type LiteralValue = boolean | number | string;

/**
 * A type expression describes the value of an attribute. Type expressions
 * compose: an `array.of` is itself a type expression.
 *
 * Optionality is NOT a type-expression concern — it lives on `AttributeSpec`
 * via the `optional` flag, since "may be absent" is an attribute-level
 * property, not a property of an inner type.
 *
 * Constituents are listed alphabetically by `kind` to satisfy the lint
 * rule; logical grouping lives in the doc comments below.
 *
 * Leaf primitives:    address, boolean, docs, float, integer, literal, literalUnion, string.
 * Named references:   codamaVersion, enumeration, nestedUnion, node, union.
 * Compounds:          array, tuple.
 */
export type TypeExpr =
    /**
     * A Solana address (a base58-encoded ed25519 public key on the wire).
     * Carrying address-ness as its own kind lets codegen targets emit a
     * dedicated address type (e.g. `Address` in Rust) rather than collapsing
     * to a generic string.
     */
    | { readonly kind: 'address' }
    | { readonly kind: 'array'; readonly of: TypeExpr }
    | { readonly kind: 'boolean' }
    /**
     * A pinned reference to the spec version of the surrounding document.
     * In TS this resolves to a literal string type; codegen for other
     * languages may emit a constant matching the spec version.
     */
    | { readonly kind: 'codamaVersion' }
    /**
     * Documentation for a node — semantically a list of paragraph strings,
     * but rendered per language at codegen time (e.g. `Array<string>` in
     * TypeScript, `Vec<String>` in Rust). Carrying the intent as its own
     * kind preserves "this is documentation" through the encoded spec
     * rather than collapsing to `array(string())`.
     */
    | { readonly kind: 'docs' }
    | { readonly kind: 'enumeration'; readonly name: string }
    | { readonly kind: 'float'; readonly width: FloatWidth }
    | { readonly kind: 'integer'; readonly width: IntegerWidth }
    | { readonly kind: 'literal'; readonly value: LiteralValue }
    /**
     * A heterogeneous union of literal values — useful for cross-typed sum
     * types like `boolean | 'either'` that don't fit a string-only
     * enumeration. The values list must be unique.
     */
    | { readonly kind: 'literalUnion'; readonly values: readonly LiteralValue[] }
    /**
     * A reference to a node, wrapped by a named `NestedUnion` recursive
     * alias. `alias` is the alias name (e.g. `'nestedTypeNode'`) declared
     * via `defineNestedUnion`; `name` is the inner node kind being wrapped.
     */
    | { readonly kind: 'nestedUnion'; readonly alias: string; readonly name: string }
    | { readonly kind: 'node'; readonly name: string }
    | { readonly kind: 'string'; readonly constraint?: StringConstraint }
    | { readonly kind: 'tuple'; readonly items: readonly TypeExpr[] }
    | { readonly kind: 'union'; readonly name: string };

/** A named attribute of a node — a single field in its data shape. */
export interface AttributeSpec {
    readonly name: string;
    readonly type: TypeExpr;
    /** When `true`, the attribute may be absent in encoded values. */
    readonly optional?: boolean;
    /** Free-form prose paragraphs describing this attribute. */
    readonly docs?: readonly string[];
}

/** A node specification: kind, optional docs, attributes, examples. */
export interface NodeSpec {
    readonly kind: string;
    readonly docs?: readonly string[];
    readonly attributes: readonly AttributeSpec[];
    /** Free-form examples (shape defined per spec major version). */
    readonly examples: readonly unknown[];
}

/** A member of a union — either a node by name, or another union by name. */
export type UnionMember =
    | { readonly kind: 'node'; readonly name: string }
    | { readonly kind: 'union'; readonly name: string };

/** A named union of nodes (and, by inclusion, of other unions). */
export interface UnionSpec {
    readonly name: string;
    readonly members: readonly UnionMember[];
    readonly docs?: readonly string[];
}

/** A single variant of an enumeration. */
export interface EnumerationVariantSpec {
    readonly name: string;
    readonly docs?: readonly string[];
}

/** A named enumeration — a closed set of named variants. */
export interface EnumerationSpec {
    readonly name: string;
    readonly variants: readonly EnumerationVariantSpec[];
    readonly docs?: readonly string[];
}

/**
 * A recursive type alias, e.g. `nestedTypeNode<T>`. Codegen renders one
 * alternative per wrapper kind, plus the base case:
 *
 * ```ts
 * type Alias<T extends Base> = Wrapper1<Alias<T>> | Wrapper2<Alias<T>> | … | T;
 * ```
 *
 * Use the `nestedUnion(alias, innerKind)` `TypeExpr` helper to reference
 * an instance of this alias from an attribute.
 */
export interface NestedUnionSpec {
    /** The alias name emitted by codegen (e.g. `'nestedTypeNode'`). */
    readonly name: string;
    readonly docs?: readonly string[];
    /**
     * The base type the recursion bottoms out in. Codegen renders this as
     * the alias's type-parameter constraint and as the final union arm.
     */
    readonly base: TypeExpr;
    /**
     * Node kinds that act as wrappers in the recursion. Each must be a
     * node whose attribute structure can wrap another `NestedUnion<T>`.
     */
    readonly wrappers: readonly string[];
}

/**
 * A category groups together a coherent set of nodes, unions,
 * enumerations, and nested unions. The category name doubles as a
 * filing hint for codegen targets that organise output by category
 * (e.g. the TypeScript node-types generator emits each category into
 * its own subdirectory).
 *
 * Category names are arbitrary strings; the spec doesn't constrain
 * them. Codegen targets either honour an open category vocabulary or
 * fail loudly on unknown categories — that policy is per-target, not
 * per-spec.
 */
export interface CategorySpec {
    readonly name: string;
    readonly docs?: readonly string[];
    readonly nodes: readonly NodeSpec[];
    readonly unions: readonly UnionSpec[];
    readonly enumerations: readonly EnumerationSpec[];
    readonly nestedUnions: readonly NestedUnionSpec[];
}

/** The full Codama spec for a single Codama major version. */
export interface Spec {
    readonly version: string;
    readonly categories: readonly CategorySpec[];
}
