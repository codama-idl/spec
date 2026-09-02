# EnumVariantTypeNode

A named variant of an enum, with an optional data payload.
Absent `data` is a unit variant; a struct payload gives named fields, a tuple payload gives positional fields, and any other type node is carried as-is — a variant holding a single type needs no tuple around it.

## Attributes

### Data

| Attribute       | Type                    | Description                                                                                                           |
| --------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `kind`          | `"enumVariantTypeNode"` | The node discriminator.                                                                                               |
| `identifier`    | `IdentifierString`      | The identifier of the variant.                                                                                        |
| `discriminator` | `u32` _(optional)_      | Explicit discriminator value. When omitted, the discriminator is the index of the variant in the enum, starting at 0. |
| `docs`          | `string[]` _(optional)_ | Markdown documentation for the variant.                                                                               |

### Children

| Attribute | Type                                                                               | Description                                                                                                                           |
| --------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `data`    | [`TypeNode`](./TypeNode.md) _(optional)_                                           | The payload carried by the variant. When omitted, the variant is a unit variant.                                                      |
| `display` | [`EnumVariantDisplayNode`](../displayNodes/EnumVariantDisplayNode.md) _(optional)_ | Display metadata describing how the variant is presented.                                                                             |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_                                    | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A unit variant — no data

```typescript
const node = enumVariantTypeNode('uninitialized');
```

### A struct variant — named fields

```typescript
enumVariantTypeNode(
    'move',
    structTypeNode([
        structFieldTypeNode({ identifier: 'x', type: integerTypeNode('u32') }),
        structFieldTypeNode({ identifier: 'y', type: integerTypeNode('u32') }),
    ]),
);
```

### A tuple variant — positional fields

```typescript
enumVariantTypeNode('coordinates', tupleTypeNode([integerTypeNode('u32'), integerTypeNode('u32')]));
```

### A variant carrying a single type — no tuple needed

```typescript
enumVariantTypeNode('amount', integerTypeNode('u64'));
```
