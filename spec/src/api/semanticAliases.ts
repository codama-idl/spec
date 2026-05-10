/**
 * Author-side semantic aliases.
 *
 * Most aliases desugar at call time so the encoded spec only ever shows
 * the underlying primitive (e.g. `{ kind: "integer", width: "u64" }` for
 * both `u64()` and `byteSize()`). Each language's codegen may further
 * specialise rendering for these widths (e.g. Rust may render `u64` as
 * `usize` for byte-size fields if it wants). Those are codegen policies
 * — not spec content.
 *
 * `docs()` is the exception: it returns its own `'docs'` `TypeExpr` kind
 * so the documentation intent survives in the encoded spec rather than
 * collapsing to `array(string())`.
 */

import { i64, u32, u64 } from './primitives';
import type { TypeExpr } from './types';

/** Number of bytes; non-negative. Encoded as `u64`. */
export function byteSize(): TypeExpr {
    return u64();
}

/** Signed byte offset. Encoded as `i64`. */
export function byteOffset(): TypeExpr {
    return i64();
}

/** Count of items in a collection; non-negative. Encoded as `u32`. */
export function count(): TypeExpr {
    return u32();
}

/**
 * Documentation for a node — semantically a list of paragraph strings,
 * but rendered per language at codegen time (e.g. `Array<string>` in
 * TypeScript, `Vec<String>` in Rust). Returns its own `'docs'` kind so
 * the intent isn't lost in the encoded spec.
 */
export function docs(): TypeExpr {
    return Object.freeze({ kind: 'docs' as const });
}
