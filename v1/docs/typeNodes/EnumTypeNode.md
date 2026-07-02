# `EnumTypeNode`

A tagged union: a numeric discriminator followed by one of several variant payloads.

## Attributes

### Data

| Attribute | Type             | Description             |
| --------- | ---------------- | ----------------------- |
| `kind`    | `"enumTypeNode"` | The node discriminator. |

### Children

| Attribute  | Type                                                                             | Description                                           |
| ---------- | -------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `variants` | [`EnumVariantTypeNode`](./EnumVariantTypeNode.md)[]                              | The variants of the enum, in declaration order.       |
| `size`     | [`NestedTypeNode`](./NestedTypeNode.md)<[`NumberTypeNode`](./NumberTypeNode.md)> | The numeric type used to serialise the discriminator. |
