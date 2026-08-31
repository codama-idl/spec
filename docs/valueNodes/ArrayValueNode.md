# ArrayValueNode

A concrete array value: a list of value nodes.

## Attributes

### Data

| Attribute | Type               | Description             |
| --------- | ------------------ | ----------------------- |
| `kind`    | `"arrayValueNode"` | The node discriminator. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `items`   | [`ValueNode`](./ValueNode.md)[]                 | The items of the array, in order.                                                                                                     |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an array value node from value nodes

```typescript
const node = arrayValueNode([numberValueNode(1), numberValueNode(2), numberValueNode(3)]);
```
