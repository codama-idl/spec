# `ArrayValueNode`

A concrete array value: a list of value nodes.

## Attributes

### Data

| Attribute | Type               | Description             |
| --------- | ------------------ | ----------------------- |
| `kind`    | `"arrayValueNode"` | The node discriminator. |

### Children

| Attribute | Type                            | Description                       |
| --------- | ------------------------------- | --------------------------------- |
| `items`   | [`ValueNode`](./ValueNode.md)[] | The items of the array, in order. |
