/**
 * Nested-union recursive aliases declared by the spec.
 *
 * Today there's only one — `nestedTypeNode<T>` — used by attributes like
 * `accountNode.data` (which holds a `structTypeNode` possibly wrapped in
 * size, offset, sentinel, or hidden prefix/suffix modifiers).
 */

import { defineNestedUnion, union } from '../api';

export const nestedTypeNode = defineNestedUnion('nestedTypeNode', {
    docs: [
        'A type, possibly wrapped in zero-or-more size, offset, sentinel, or hidden prefix/suffix modifiers.',
        'The wrapping is recursive: each modifier wraps another `nestedTypeNode<T>` until the inner `T` is reached.',
        'For example, a `nestedTypeNode<stringTypeNode>` can be fulfilled by a plain `stringTypeNode`, by a `fixedSizeTypeNode` wrapping a `stringTypeNode`, or by any deeper nesting such as `hiddenPrefixTypeNode<preOffsetTypeNode<fixedSizeTypeNode<stringTypeNode>>>`.',
    ],
    base: union('typeNode'),
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
