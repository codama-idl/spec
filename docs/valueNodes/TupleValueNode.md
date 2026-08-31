# TupleValueNode

A concrete tuple value: a fixed-length sequence of positional value nodes.

## Attributes

### Data

| Attribute | Type               | Description             |
| --------- | ------------------ | ----------------------- |
| `kind`    | `"tupleValueNode"` | The node discriminator. |

### Children

| Attribute | Type                            | Description                                  |
| --------- | ------------------------------- | -------------------------------------------- |
| `items`   | [`ValueNode`](./ValueNode.md)[] | The positional items of the tuple, in order. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a tuple value node from value nodes

```typescript
const node = tupleValueNode([stringValueNode('Alice'), numberValueNode(42)]);
```
