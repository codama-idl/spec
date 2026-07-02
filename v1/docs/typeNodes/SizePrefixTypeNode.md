# `SizePrefixTypeNode`

Wraps another type with a numeric prefix indicating the byte length of the wrapped type.

## Attributes

### Data

| Attribute | Type                   | Description             |
| --------- | ---------------------- | ----------------------- |
| `kind`    | `"sizePrefixTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                                                             | Description                                                   |
| --------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `type`    | [`TypeNode`](./TypeNode.md)                                                      | The wrapped type whose serialisation is preceded by its size. |
| `prefix`  | [`NestedTypeNode`](./NestedTypeNode.md)<[`NumberTypeNode`](./NumberTypeNode.md)> | The numeric type used as the size prefix.                     |
