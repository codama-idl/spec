# `SomeValueNode`

The "present" value for an optional type, wrapping a concrete value node.

## Attributes

### Data

| Attribute | Type              | Description             |
| --------- | ----------------- | ----------------------- |
| `kind`    | `"someValueNode"` | The node discriminator. |

### Children

| Attribute | Type                          | Description        |
| --------- | ----------------------------- | ------------------ |
| `value`   | [`ValueNode`](./ValueNode.md) | The wrapped value. |
