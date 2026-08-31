# TransformNode (abstract)

A modifier applied to the serialisation of the type node that carries it.
Every type node has an optional `transforms` array. Transforms apply in array order, the first being the innermost: a `stringTypeNode` with `transforms: [sentinel, fixedSize]` first delimits the string with the sentinel, then fixes the total byte size — exactly the v1 nesting `fixedSizeTypeNode(sentinelTypeNode(stringTypeNode))` read inside-out.

One of the following:

- [`FixedSizeTransformNode`](./FixedSizeTransformNode.md)
- [`HiddenPrefixTransformNode`](./HiddenPrefixTransformNode.md)
- [`HiddenSuffixTransformNode`](./HiddenSuffixTransformNode.md)
- [`PostOffsetTransformNode`](./PostOffsetTransformNode.md)
- [`PreOffsetTransformNode`](./PreOffsetTransformNode.md)
- [`SentinelTransformNode`](./SentinelTransformNode.md)
- [`SizePrefixTransformNode`](./SizePrefixTransformNode.md)
