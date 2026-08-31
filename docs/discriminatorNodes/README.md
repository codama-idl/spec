# Discriminator

Discriminator nodes — strategies for distinguishing one account or instruction from another.

## Nodes

- [`ConstantDiscriminatorNode`](./ConstantDiscriminatorNode.md) - Identifies a node by a constant value at a known byte offset (e.g. a magic header).
- [`FieldDiscriminatorNode`](./FieldDiscriminatorNode.md) - Identifies a node by the value of a named field at a known byte offset.
- [`SizeDiscriminatorNode`](./SizeDiscriminatorNode.md) - Identifies a node by its expected total byte size.

## Unions

- [`DiscriminatorNode`](./DiscriminatorNode.md) - The composable form: any registered discriminator node.
- [`RegisteredDiscriminatorNode`](./RegisteredDiscriminatorNode.md) - Every node tagged as a discriminator strategy.
