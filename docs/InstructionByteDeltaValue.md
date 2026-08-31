# InstructionByteDeltaValue (abstract)

The value forms accepted by an `instructionByteDeltaNode`.
An `accountLinkNode` uses the size of the linked account; an `argumentValueNode` uses the value of the referenced instruction argument; a `numberValueNode` uses that explicit number; and a `resolverValueNode` acts as a fallback for more complex values.

One of the following:

- [`AccountLinkNode`](./linkNodes/AccountLinkNode.md)
- [`ArgumentValueNode`](./contextualValueNodes/ArgumentValueNode.md)
- [`NumberValueNode`](./valueNodes/NumberValueNode.md)
- [`ResolverValueNode`](./contextualValueNodes/ResolverValueNode.md)
