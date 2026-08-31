# EnumStructVariantTypeNode

A variant of an enum that carries a struct payload (named fields).

## Attributes

### Data

| Attribute       | Type                          | Description                                                                                                           |
| --------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `kind`          | `"enumStructVariantTypeNode"` | The node discriminator.                                                                                               |
| `name`          | `CamelCaseString`             | The name of the variant.                                                                                              |
| `discriminator` | `u32` _(optional)_            | Explicit discriminator value. When omitted, the discriminator is the index of the variant in the enum, starting at 0. |

### Children

| Attribute | Type                                                                               | Description                                               |
| --------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `struct`  | [`NestedTypeNode`](./NestedTypeNode.md)<[`StructTypeNode`](./StructTypeNode.md)>   | The struct of named fields carried by the variant.        |
| `display` | [`EnumVariantDisplayNode`](../displayNodes/EnumVariantDisplayNode.md) _(optional)_ | Display metadata describing how the variant is presented. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a struct enum variant type node from a name and a struct

```typescript
const node = enumStructVariantTypeNode(
    'coordinates',
    structTypeNode([
        structFieldTypeNode({ name: 'x', type: numberTypeNode('u32') }),
        structFieldTypeNode({ name: 'y', type: numberTypeNode('u32') }),
    ]),
);
```
