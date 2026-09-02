# InstructionByteDeltaValue (abstract)

The value forms accepted by an `instructionByteDeltaNode`.
An `accountLinkNode` uses the size of the linked account; a `dataValueNode` uses a value within the instruction data; and an `integerValueNode` uses that explicit number.

One of the following:

- [`AccountLinkNode`](./linkNodes/AccountLinkNode.md)
- [`DataValueNode`](./contextualValueNodes/DataValueNode.md)
- [`IntegerValueNode`](./valueNodes/IntegerValueNode.md)
