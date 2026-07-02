# `NumberTypeNode`

A numeric type with a fixed wire format and byte order.

## Attributes

### Data

| Attribute | Type               | Description             |
| --------- | ------------------ | ----------------------- |
| `kind`    | `"numberTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                                                     | Description                                              |
| --------- | ------------------------------------------------------------------------ | -------------------------------------------------------- |
| `format`  | [`NumberFormat`](../sharedNodes/NumberFormat.md)                         | The wire format used to serialise the number.            |
| `endian`  | [`Endianness`](../sharedNodes/Endianness.md)                             | The byte order used to serialise the number.             |
| `display` | [`NumberDisplayNode`](../displayNodes/NumberDisplayNode.md) _(optional)_ | Display metadata describing how the number is presented. |
