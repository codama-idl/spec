# TupleValueNode

A concrete tuple value: a fixed-length sequence of positional value nodes.

## Attributes

### Data

| Attribute | Type               | Description             |
| --------- | ------------------ | ----------------------- |
| `kind`    | `"tupleValueNode"` | The node discriminator. |

### Children

| Attribute | Type                            | Description                                  |
| --------- | ------------------------------- | -------------------------------------------- |
| `items`   | [`ValueNode`](./ValueNode.md)[] | The positional items of the tuple, in order. |
