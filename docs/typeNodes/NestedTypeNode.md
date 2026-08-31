# NestedTypeNode (recursive)

A type, possibly wrapped in zero-or-more size, offset, sentinel, or hidden prefix/suffix modifiers.
The wrapping is recursive: each modifier wraps another `nestedTypeNode<T>` until the inner `T` is reached.
For example, a `nestedTypeNode<stringTypeNode>` can be fulfilled by a plain `stringTypeNode`, by a `fixedSizeTypeNode` wrapping a `stringTypeNode`, or by any deeper nesting such as `hiddenPrefixTypeNode<preOffsetTypeNode<fixedSizeTypeNode<stringTypeNode>>>`.

Base: [`TypeNode`](./TypeNode.md)

## Wrappers

- [`FixedSizeTypeNode`](./FixedSizeTypeNode.md)
- [`SizePrefixTypeNode`](./SizePrefixTypeNode.md)
- [`PreOffsetTypeNode`](./PreOffsetTypeNode.md)
- [`PostOffsetTypeNode`](./PostOffsetTypeNode.md)
- [`SentinelTypeNode`](./SentinelTypeNode.md)
- [`HiddenPrefixTypeNode`](./HiddenPrefixTypeNode.md)
- [`HiddenSuffixTypeNode`](./HiddenSuffixTypeNode.md)
