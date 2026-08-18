# SomeValueNode

The "present" value for an optional type, wrapping a concrete value node.
For instance, this can be set as the default value of a field whose type is an `optionTypeNode`.

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
