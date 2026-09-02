# InstructionByteDeltaValue (abstract)

The value forms accepted by an `instructionByteDeltaNode`.
An `accountLinkNode` uses the size of the linked account; an `argumentValueNode` uses a value within the instruction data; and a `numberValueNode` uses that explicit number.

One of the following:

- [`AccountLinkNode`](./linkNodes/AccountLinkNode.md)
- [`ArgumentValueNode`](./contextualValueNodes/ArgumentValueNode.md)
- [`NumberValueNode`](./valueNodes/NumberValueNode.md)
