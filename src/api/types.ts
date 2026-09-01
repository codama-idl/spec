/**
 * Public types describing the shape of a Codama spec.
 *
 * These types are version-agnostic — the same shape describes a Codama v1
 * spec, a v2 spec, etc. The current major's content (concrete nodes,
 * enumerations, unions, categories) lives under `src/spec/`. The first half of
 * this file declares the type-expression vocabulary; the second half
 * declares the spec-content shape (attributes, nodes, unions,
 * enumerations, nested unions, categories).
 */

import type { DocExamples } from './example';

export type IntegerWidth = 'i8' | 'i16' | 'i32' | 'i64' | 'i128' | 'u8' | 'u16' | 'u32' | 'u64' | 'u128';

export type FloatWidth = 'f32' | 'f64';

/**
 * Constraints a `string` type expression may carry:
 *
 * - `identifier` — a machine key: `[A-Za-z_][A-Za-z0-9_]*` (letters, digits,
 *   underscore; no leading digit). No casing is mandated — `transferTokens`,
 *   `transfer_tokens` and `TransferTokens` are all valid — but identifiers
 *   sharing a scope must remain unique after lowercasing and stripping
 *   underscores, so that renderers converting to their target casing
 *   conventions never collide. A scope is a sibling set of the same kind
 *   (the accounts of an instruction, the fields of a struct, the defined
 *   types of a program, …); the full resolution rules ship with path
 *   expressions. References match identifiers by exact string comparison —
 *   the folding rule governs uniqueness only, which is what makes exact
 *   matching unambiguous.
 * - `namespace` — a chain of identifiers separated by single dots, i.e.
 *   `identifier ("." identifier)*`: a single identifier is a valid
 *   namespace, segments follow the identifier charset, and empty segments
 *   or leading/trailing dots are not. Used for plugin names, which match
 *   by exact string comparison; the identifier folding-uniqueness rule
 *   does not apply to namespaces.
 * - `path` — a path expression pointing into nested data:
 *   `identifier ( "." identifier | "[" integer "]" )*`, with non-negative
 *   integer indices. `.identifier` accesses a struct field by exact
 *   identifier match; `[n]` accesses the n-th item of an array, tuple or
 *   set. Each attribute carrying a path documents its anchor — the data
 *   the first segment is resolved against. Interpolated text templates
 *   embed the same expressions as `${root.path}` placeholders, where the
 *   leading root (e.g. `data`, `accounts`) names the anchor explicitly.
 *   The grammar is deliberately minimal and unambiguous — identifiers
 *   exclude dots, so paths never need quoting or escaping; extensions
 *   may land in minor spec versions.
 * - `version` — a semver version string (e.g. `"1.6.0"`).
 */
export type StringConstraint = 'identifier' | 'namespace' | 'path' | 'version';

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
 * Leaf primitives:    address, boolean, docs, float, integer, json, literal, literalUnion, string.
 * Named references:   codamaVersion, enumeration, nestedUnion, node, union.
 * Anonymous nodes:    anyNode (any node kind defined by the spec).
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
    /**
     * A reference to any node kind defined by the spec.
     * Codegen targets map this to their top-level `Node` registry type,
     * so a slot typed `anyNode` accepts every concrete node without the
     * spec having to enumerate them.
     */
    | { readonly kind: 'anyNode' }
    | { readonly kind: 'array'; readonly of: TypeExpr }
    | { readonly kind: 'boolean' }
    /**
     * A pinned reference to the spec version of the surrounding IDL.
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
    | { readonly kind: 'json' }
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

/**
 * Documentation for a spec entity, as lines of markdown.
 * Works like the `Docs` type on IDL nodes (generated from the `docs` `TypeExpr`).
 *
 * Each entry is one line; renderers join them with a newline. This keeps
 * multi-line docs readable line-by-line in the serialised `spec.json`,
 * mirroring the example `code()` content convention. Conventions:
 *
 * - The first line is a self-contained one-line summary — documentation
 *   tables and lists display it on its own.
 * - A blank (`''`) entry separates paragraphs.
 * - Multi-line markdown constructs (fenced code snippets, callouts such as
 *   `> [!NOTE]`, images) are authored one line per entry.
 */
export type Docs = readonly string[];

/** A named attribute of a node — a single field in its data shape. */
export interface AttributeSpec {
    readonly name: string;
    readonly type: TypeExpr;
    /** When `true`, the attribute may be absent in encoded values. */
    readonly optional?: boolean;
    readonly docs?: Docs;
}

/** A node specification: kind, optional docs, attributes, examples. */
export interface NodeSpec {
    readonly kind: string;
    readonly docs?: Docs;
    readonly attributes: readonly AttributeSpec[];
    /** Worked documentation examples for this node - see `DocExample`. */
    readonly examples: DocExamples;
}

/** A member of a union — either a node by name, or another union by name. */
export type UnionMember =
    | { readonly kind: 'node'; readonly name: string }
    | { readonly kind: 'union'; readonly name: string };

/** A named union of nodes (and, by inclusion, of other unions). */
export interface UnionSpec {
    readonly name: string;
    readonly members: readonly UnionMember[];
    readonly docs?: Docs;
}

/** A single variant of an enumeration. */
export interface EnumerationVariantSpec {
    readonly name: string;
    readonly docs?: Docs;
}

/** A named enumeration — a closed set of named variants. */
export interface EnumerationSpec {
    readonly name: string;
    readonly variants: readonly EnumerationVariantSpec[];
    readonly docs?: Docs;
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
    readonly docs?: Docs;
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
 * Attributes shared by every node of a spec — its "base node" shape.
 *
 * Codegen targets append these after each node's declared attributes (and
 * after the implicit `kind` discriminator), so base attributes always
 * serialise last. They may also emit a shared `BaseNode` interface that
 * every generated node type extends. Base attribute names must not collide
 * with any node's declared attributes — `validate` enforces this.
 */
export interface BaseSpec {
    readonly attributes: readonly AttributeSpec[];
    readonly docs?: Docs;
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
    readonly docs?: Docs;
    readonly nodes: readonly NodeSpec[];
    readonly unions: readonly UnionSpec[];
    readonly enumerations: readonly EnumerationSpec[];
    readonly nestedUnions: readonly NestedUnionSpec[];
}

/** The full Codama spec for a single Codama major version. */
export interface Spec {
    readonly version: string;
    /** Attributes shared by every node — absent when the spec declares none. */
    readonly base?: BaseSpec;
    readonly categories: readonly CategorySpec[];
}
