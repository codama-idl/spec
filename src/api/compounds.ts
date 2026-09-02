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
