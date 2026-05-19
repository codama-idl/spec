/**
 * Nested-union recursive aliases declared by the v1 spec.
 *
 * Today there's only one — `NestedTypeNode<T>` — used by attributes like
 * `accountNode.data` (which holds a `structTypeNode` possibly wrapped in
 * size, offset, sentinel, or hidden prefix/suffix modifiers).
 */

import { defineNestedUnion, union } from '../api';

export const nestedTypeNode = defineNestedUnion('NestedTypeNode', {
    docs: [
        'A type, possibly wrapped in zero-or-more size, offset, sentinel, or hidden prefix/suffix modifiers.',
        'The wrapping is recursive: each modifier wraps another `NestedTypeNode<T>` until the inner `T` is reached.',
    ],
    base: union('TypeNode'),
    wrappers: [
        'fixedSizeTypeNode',
        'sizePrefixTypeNode',
        'preOffsetTypeNode',
        'postOffsetTypeNode',
        'sentinelTypeNode',
        'hiddenPrefixTypeNode',
        'hiddenSuffixTypeNode',
    ],
});
