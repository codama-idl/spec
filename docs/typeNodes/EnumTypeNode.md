# EnumTypeNode

A tagged union: a numeric discriminator followed by one of several variant payloads.

## Attributes

### Data

| Attribute | Type             | Description             |
| --------- | ---------------- | ----------------------- |
| `kind`    | `"enumTypeNode"` | The node discriminator. |

### Children

| Attribute  | Type                                                                             | Description                                                                                                                                                                                                                                                                        |
| ---------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variants` | [`EnumVariantTypeNode`](./EnumVariantTypeNode.md)[]                              | The variants of the enum, in declaration order.                                                                                                                                                                                                                                    |
| `size`     | [`NestedTypeNode`](./NestedTypeNode.md)<[`NumberTypeNode`](./NumberTypeNode.md)> | The numeric type used to serialise the discriminator. The discriminator prepends the serialised variant payload to identify which variant was selected. By default it is the index of the variant (starting at 0), unless the variant provides its own custom discriminator value. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Enum with u8 discriminator

```typescript
enumTypeNode([
    enumEmptyVariantTypeNode('flip'),
    enumTupleVariantTypeNode('rotate', tupleTypeNode([numberTypeNode('u32')])),
    enumStructVariantTypeNode(
        'move',
        structTypeNode([
            structFieldTypeNode({ name: 'x', type: numberTypeNode('u16') }),
            structFieldTypeNode({ name: 'y', type: numberTypeNode('u16') }),
        ]),
    ),
]);

// Flip                => 0x00
// Rotate (42)         => 0x012A000000
// Move { x: 1, y: 2 } => 0x0201000200
```
