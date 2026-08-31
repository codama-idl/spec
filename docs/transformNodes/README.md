# Transform

Transform nodes — modifiers applied to the serialisation of the type node that carries them.
Every type node has an optional `transforms` array; transforms apply in array order, the first being the innermost.

## Nodes

- [`FixedSizeTransformNode`](./FixedSizeTransformNode.md) - Asserts a fixed total byte size for the transformed type. Padding or truncation is applied as needed.
- [`HiddenPrefixTransformNode`](./HiddenPrefixTransformNode.md) - Prefixes the transformed type with a list of constant values that are written and read but not surfaced as fields to consumers.
- [`HiddenSuffixTransformNode`](./HiddenSuffixTransformNode.md) - Suffixes the transformed type with a list of constant values that are written and read but not surfaced as fields to consumers.
- [`PostOffsetTransformNode`](./PostOffsetTransformNode.md) - After serialising the transformed type, advance the cursor by `offset` bytes interpreted via the chosen strategy.
- [`PreOffsetTransformNode`](./PreOffsetTransformNode.md) - Before serialising the transformed type, advance the cursor by `offset` bytes interpreted via the chosen strategy.
- [`SentinelTransformNode`](./SentinelTransformNode.md) - Delimits the transformed type with a constant sentinel value written immediately after it.
- [`SizePrefixTransformNode`](./SizePrefixTransformNode.md) - Precedes the transformed type with a numeric prefix indicating its byte length.

## Unions

- [`TransformNode`](./TransformNode.md) - A modifier applied to the serialisation of the type node that carries it.
