# `NestedTypeNode` (recursive)

A type, possibly wrapped in zero-or-more size, offset, sentinel, or hidden prefix/suffix modifiers. The wrapping is recursive: each modifier wraps another `nestedTypeNode<T>` until the inner `T` is reached.

Base: [`TypeNode`](./TypeNode.md)

## Wrappers

- [`FixedSizeTypeNode`](./FixedSizeTypeNode.md)
- [`SizePrefixTypeNode`](./SizePrefixTypeNode.md)
- [`PreOffsetTypeNode`](./PreOffsetTypeNode.md)
- [`PostOffsetTypeNode`](./PostOffsetTypeNode.md)
- [`SentinelTypeNode`](./SentinelTypeNode.md)
- [`HiddenPrefixTypeNode`](./HiddenPrefixTypeNode.md)
- [`HiddenSuffixTypeNode`](./HiddenSuffixTypeNode.md)
