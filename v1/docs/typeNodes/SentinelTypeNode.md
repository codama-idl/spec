# SentinelTypeNode

Wraps another type and delimits it with a constant sentinel value written immediately after the wrapped type.

## Attributes

### Data

| Attribute | Type                 | Description             |
| --------- | -------------------- | ----------------------- |
| `kind`    | `"sentinelTypeNode"` | The node discriminator. |

### Children

| Attribute  | Type                                                      | Description                                                                    |
| ---------- | --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `type`     | [`TypeNode`](./TypeNode.md)                               | The wrapped type whose extent is delimited by the sentinel.                    |
| `sentinel` | [`ConstantValueNode`](../valueNodes/ConstantValueNode.md) | The constant value written immediately after the wrapped type to mark its end. |
