/**
 * Compound type-expression constructors — wrap or combine other type
 * expressions. Returned values are frozen.
 *
 * Optionality is intentionally NOT a compound: it's an attribute-level
 * concern, expressed via `optionalAttribute(...)` or
 * `attribute(..., { optional: true })`.
 */

import type { TypeExpr } from './types';

/** An array (homogeneous list) of `inner`. */
export function array(inner: TypeExpr): TypeExpr {
    return Object.freeze({ kind: 'array' as const, of: inner });
}

/**
 * A heterogeneous fixed-length tuple. Each positional slot has its own type.
 *
 * Tuples use `items` (plural) rather than `of` to signal cardinality > 1.
 */
export function tuple(...items: TypeExpr[]): TypeExpr {
    return Object.freeze({ kind: 'tuple' as const, items: Object.freeze([...items]) });
}
