# SetTypeNode

A unique-valued collection. The item type is defined by `item`; the size is determined by the `count` strategy.

## Attributes

### Data

| Attribute | Type            | Description             |
| --------- | --------------- | ----------------------- |
| `kind`    | `"setTypeNode"` | The node discriminator. |

### Children

| Attribute    | Type                                                                 | Description                                                                                                                           |
| ------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `item`       | [`TypeNode`](./TypeNode.md)                                          | The type of each item in the set.                                                                                                     |
| `count`      | [`CountNode`](../countNodes/CountNode.md)                            | The strategy used to determine the number of items.                                                                                   |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_ | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                          |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                      | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### u32 prefixed set of u8 numbers

```typescript
setTypeNode(integerTypeNode('u8'), prefixedCountNode(integerTypeNode('u32')));

// Set (1, 2, 3) => 0x03000000010203
```
