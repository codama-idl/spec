# StructTypeNode

A composite type made of an ordered list of named fields. Fields are encoded and decoded in declaration order.

## Attributes

### Data

| Attribute | Type               | Description             |
| --------- | ------------------ | ----------------------- |
| `kind`    | `"structTypeNode"` | The node discriminator. |

### Children

| Attribute    | Type                                                                 | Description                                                                                                                           |
| ------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `fields`     | [`StructFieldTypeNode`](./StructFieldTypeNode.md)[]                  | The fields of the struct, in declaration order.                                                                                       |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_ | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                          |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                      | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A struct storing a person's name and age

```typescript
structTypeNode([
    structFieldTypeNode({ name: 'name', type: stringTypeNode('utf8', { transforms: [fixedSizeTransformNode(10)] }) }),
    structFieldTypeNode({ name: 'age', type: numberTypeNode('u8') }),
]);

// { name: Alice, age: 42 } => 0x416C69636500000000002A
```
