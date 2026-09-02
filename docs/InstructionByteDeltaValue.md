# InstructionByteDeltaValue (abstract)

The value forms accepted by an `instructionByteDeltaNode`.
An `accountLinkNode` uses the size of the linked account; an `dataValueNode` uses a value within the instruction data; and a `numberValueNode` uses that explicit number.

One of the following:

- [`AccountLinkNode`](./linkNodes/AccountLinkNode.md)
- [`DataValueNode`](./contextualValueNodes/DataValueNode.md)
- [`NumberValueNode`](./valueNodes/NumberValueNode.md)
