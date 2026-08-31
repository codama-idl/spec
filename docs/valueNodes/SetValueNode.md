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

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a set value node from value nodes

```typescript
const node = setValueNode([numberValueNode(1), numberValueNode(2), numberValueNode(3)]);
```
