/**
 * Author-side semantic aliases over integer primitives. They desugar at call
 * time so the encoded spec only ever shows the underlying primitive (e.g.
 * `{ kind: "integer", width: "u64" }` for both `u64()` and `byteSize()`).
 *
 * Each language's codegen may further specialise rendering for these widths
 * (e.g. Rust may render `u64` as `usize` for byte-size fields if it wants).
 * Those are codegen policies — not spec content.
 */

import { array } from './compounds';
import { i64, string, u32, u64 } from './primitives';
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

/** Documentation for a node — an array of paragraph strings. */
export function docs(): TypeExpr {
    return array(string());
}
