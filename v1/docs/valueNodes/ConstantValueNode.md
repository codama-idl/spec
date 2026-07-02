# `ConstantValueNode`

A typed constant: a type node paired with a concrete value node.

## Attributes

### Data

| Attribute | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| `kind`    | `"constantValueNode"` | The node discriminator. |

### Children

| Attribute | Type                                   | Description                         |
| --------- | -------------------------------------- | ----------------------------------- |
| `type`    | [`TypeNode`](../typeNodes/TypeNode.md) | The type of the constant.           |
| `value`   | [`ValueNode`](./ValueNode.md)          | The concrete value of the constant. |
