# SolAmountTypeNode

A SOL amount expressed in lamports under the wrapped numeric type.

## Attributes

### Data

| Attribute | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| `kind`    | `"solAmountTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                                                             | Description                                            |
| --------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `number`  | [`NestedTypeNode`](./NestedTypeNode.md)<[`NumberTypeNode`](./NumberTypeNode.md)> | The numeric type used to serialise the lamport amount. |
