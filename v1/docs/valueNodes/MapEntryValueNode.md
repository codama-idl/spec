# MapEntryValueNode

A single (key, value) pair inside a `mapValueNode`.

## Attributes

### Data

| Attribute | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| `kind`    | `"mapEntryValueNode"` | The node discriminator. |

### Children

| Attribute | Type                          | Description      |
| --------- | ----------------------------- | ---------------- |
| `key`     | [`ValueNode`](./ValueNode.md) | The entry key.   |
| `value`   | [`ValueNode`](./ValueNode.md) | The entry value. |
