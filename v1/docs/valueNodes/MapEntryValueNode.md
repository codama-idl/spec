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

## Examples

### Create a map entry value node from a key and a value

```typescript
const node = mapEntryValueNode(stringValueNode('total'), numberValueNode(42));
```
