# ArrayValueNode

A concrete array value: a list of value nodes.

## Attributes

### Data

| Attribute | Type               | Description             |
| --------- | ------------------ | ----------------------- |
| `kind`    | `"arrayValueNode"` | The node discriminator. |

### Children

| Attribute | Type                                            | Description                                     |
| --------- | ----------------------------------------------- | ----------------------------------------------- |
| `items`   | [`ValueNode`](./ValueNode.md)[]                 | The items of the array, in order.               |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. |

## Examples

### Create an array value node from value nodes

```typescript
const node = arrayValueNode([integerValueNode('1'), integerValueNode('2'), integerValueNode('3')]);
```
