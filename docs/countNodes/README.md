# Count

Count nodes — strategies for sizing a homogeneous collection in serialized form.

## Nodes

- [`FixedCountNode`](./FixedCountNode.md) - A count strategy that fixes the number of items at a constant value.
- [`PrefixedCountNode`](./PrefixedCountNode.md) - A count strategy where the number of items is read from a numeric prefix.
- [`RemainderCountNode`](./RemainderCountNode.md) - A count strategy where items are read until the buffer is exhausted.

## Unions

- [`CountNode`](./CountNode.md) - The composable form: any registered count node.
- [`RegisteredCountNode`](./RegisteredCountNode.md) - Every node tagged as a count strategy.
