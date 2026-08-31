# EnumEmptyVariantTypeNode

A unit-style variant of an enum that carries no payload.

## Attributes

### Data

| Attribute       | Type                         | Description                                                                                                           |
| --------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `kind`          | `"enumEmptyVariantTypeNode"` | The node discriminator.                                                                                               |
| `name`          | `CamelCaseString`            | The name of the variant.                                                                                              |
| `discriminator` | `u32` _(optional)_           | Explicit discriminator value. When omitted, the discriminator is the index of the variant in the enum, starting at 0. |

### Children

| Attribute | Type                                                                               | Description                                               |
| --------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `display` | [`EnumVariantDisplayNode`](../displayNodes/EnumVariantDisplayNode.md) _(optional)_ | Display metadata describing how the variant is presented. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an empty enum variant type node from a name

```typescript
const node = enumEmptyVariantTypeNode('myVariantName');
```
