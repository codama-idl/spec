/**
 * The closed list of node kinds that act as wrappers in the
 * `NestedTypeNode<T>` recursion.
 *
 * Codegen for each language uses this list to emit the wrapping behaviour
 * (e.g. an enum or union covering "T or any wrapper of NestedTypeNode<T>").
 */

export const NESTED_TYPE_NODE_WRAPPERS = [
    'fixedSizeTypeNode',
    'sizePrefixTypeNode',
    'preOffsetTypeNode',
    'postOffsetTypeNode',
    'sentinelTypeNode',
    'hiddenPrefixTypeNode',
    'hiddenSuffixTypeNode',
] as const;

export type NestedTypeNodeWrapper = (typeof NESTED_TYPE_NODE_WRAPPERS)[number];
