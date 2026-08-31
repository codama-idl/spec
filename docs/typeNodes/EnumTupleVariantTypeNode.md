# EnumTupleVariantTypeNode

A variant of an enum that carries a tuple payload (positional fields).

## Attributes

### Data

| Attribute       | Type                         | Description                                                                                                           |
| --------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `kind`          | `"enumTupleVariantTypeNode"` | The node discriminator.                                                                                               |
| `name`          | `CamelCaseString`            | The name of the variant.                                                                                              |
| `discriminator` | `u32` _(optional)_           | Explicit discriminator value. When omitted, the discriminator is the index of the variant in the enum, starting at 0. |

### Children

| Attribute | Type                                                                               | Description                                                                                                                           |
| --------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `tuple`   | [`NestedTypeNode`](./NestedTypeNode.md)<[`TupleTypeNode`](./TupleTypeNode.md)>     | The tuple of positional fields carried by the variant.                                                                                |
| `display` | [`EnumVariantDisplayNode`](../displayNodes/EnumVariantDisplayNode.md) _(optional)_ | Display metadata describing how the variant is presented.                                                                             |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_                                    | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a tuple enum variant type node from a name and a tuple

```typescript
const node = enumTupleVariantTypeNode('coordinates', tupleTypeNode([numberTypeNode('u32'), numberTypeNode('u32')]));
```
