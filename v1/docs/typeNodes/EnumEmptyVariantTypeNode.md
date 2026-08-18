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

## Examples

### Create an empty enum variant type node from a name

```typescript
const node = enumEmptyVariantTypeNode('myVariantName');
```
