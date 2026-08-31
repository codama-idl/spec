# SetValueNode

A concrete set value: a list of unique value nodes.

## Attributes

### Data

| Attribute | Type             | Description             |
| --------- | ---------------- | ----------------------- |
| `kind`    | `"setValueNode"` | The node discriminator. |

### Children

| Attribute | Type                            | Description           |
| --------- | ------------------------------- | --------------------- |
| `items`   | [`ValueNode`](./ValueNode.md)[] | The items of the set. |

## Examples

### Create a set value node from value nodes

```typescript
const node = setValueNode([numberValueNode(1), numberValueNode(2), numberValueNode(3)]);
```
