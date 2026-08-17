# SomeValueNode

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

## Examples

### Create a some value node from a value node

```typescript
const node = someValueNode(numberValueNode(42));
```
