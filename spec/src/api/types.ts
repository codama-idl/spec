/**
 * Public types describing the shape of a Codama spec.
 *
 * These types are version-agnostic — the same shape describes a Codama v1
 * spec, a v2 spec, etc. Versioned content (concrete nodes, enumerations,
 * unions) lives under `spec/src/v<n>/`.
 */

// ---------------------------------------------------------------------------
// Type expressions
// ---------------------------------------------------------------------------

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
 * Leaf primitives:    boolean, float, integer, literal, literalUnion, string.
 * Named references:   enumeration, nestedTypeNode, node, union.
 * Compounds:          array, tuple.
 */
export type TypeExpr =
    | { readonly kind: 'array'; readonly of: TypeExpr }
    | { readonly kind: 'boolean' }
    /**
     * A pinned reference to the spec version of the surrounding document.
     * In TS this resolves to a literal string type; codegen for other
     * languages may emit a constant matching the spec version.
     */
    | { readonly kind: 'codamaVersion' }
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
    | { readonly kind: 'nestedTypeNode'; readonly name: string }
    | { readonly kind: 'node'; readonly name: string }
    | { readonly kind: 'string'; readonly constraint?: StringConstraint }
    | { readonly kind: 'tuple'; readonly items: readonly TypeExpr[] }
    | { readonly kind: 'union'; readonly name: string };

// ---------------------------------------------------------------------------
// Spec content
// ---------------------------------------------------------------------------

/** A named attribute of a node — a single field in its data shape. */
export interface AttributeSpec {
    readonly name: string;
    readonly type: TypeExpr;
    /** When `true`, the attribute may be absent in encoded values. */
    readonly optional?: boolean;
    /** Free-form prose description for codegen / docs. */
    readonly docs?: string;
}

/** A node specification: kind, optional docs, attributes, examples. */
export interface NodeSpec {
    readonly kind: string;
    readonly docs?: string;
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
    readonly docs?: string;
}

/** A single variant of an enumeration. */
export interface EnumerationVariantSpec {
    readonly name: string;
    readonly docs?: string;
}

/** A named enumeration — a closed set of named variants. */
export interface EnumerationSpec {
    readonly name: string;
    readonly variants: readonly EnumerationVariantSpec[];
    readonly docs?: string;
}

/** The full Codama spec for a single Codama major version. */
export interface Spec {
    readonly version: string;
    readonly enumerations: readonly EnumerationSpec[];
    readonly nodes: readonly NodeSpec[];
    readonly unions: readonly UnionSpec[];
    /**
     * The closed list of node kinds that act as wrappers in the recursive
     * `NestedTypeNode<T>` construct. Codegen targets render this list as
     * the wrapping behaviour for each language. Specific to Codama v1; may
     * be removed or reshaped in future Codama majors.
     */
    readonly nestedTypeNodeWrappers: readonly string[];
}
