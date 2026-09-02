# SetValueNode

A concrete set value: a list of unique value nodes.

## Attributes

### Data

| Attribute | Type             | Description             |
| --------- | ---------------- | ----------------------- |
| `kind`    | `"setValueNode"` | The node discriminator. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `items`   | [`ValueNode`](./ValueNode.md)[]                 | The items of the set.                                                                                                                 |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a set value node from value nodes

```typescript
const node = setValueNode([integerValueNode('1'), integerValueNode('2'), integerValueNode('3')]);
```
