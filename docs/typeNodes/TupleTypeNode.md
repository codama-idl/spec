# TupleTypeNode

A heterogeneous fixed-length sequence in which each positional slot has its own type.

## Attributes

### Data

| Attribute | Type              | Description             |
| --------- | ----------------- | ----------------------- |
| `kind`    | `"tupleTypeNode"` | The node discriminator. |

### Children

| Attribute    | Type                                                                 | Description                                                                                                                           |
| ------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `items`      | [`TypeNode`](./TypeNode.md)[]                                        | The type of each positional slot, in order.                                                                                           |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_ | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                          |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                      | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A tuple storing a person's name and age

```typescript
tupleTypeNode([stringTypeNode('utf8', { transforms: [fixedSizeTransformNode(10)] }), integerTypeNode('u8')]);

// (Alice, 42) => 0x416C69636500000000002A
```
