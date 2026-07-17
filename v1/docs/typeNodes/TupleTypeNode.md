# TupleTypeNode

A heterogeneous fixed-length sequence in which each positional slot has its own type.

## Attributes

### Data

| Attribute | Type              | Description             |
| --------- | ----------------- | ----------------------- |
| `kind`    | `"tupleTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                          | Description                                 |
| --------- | ----------------------------- | ------------------------------------------- |
| `items`   | [`TypeNode`](./TypeNode.md)[] | The type of each positional slot, in order. |
