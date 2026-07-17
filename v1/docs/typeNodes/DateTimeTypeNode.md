# DateTimeTypeNode

A timestamp encoded as a number, typically seconds since the Unix epoch. The wrapped number type determines the byte width.

## Attributes

### Data

| Attribute | Type                 | Description             |
| --------- | -------------------- | ----------------------- |
| `kind`    | `"dateTimeTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                                                             | Description                                       |
| --------- | -------------------------------------------------------------------------------- | ------------------------------------------------- |
| `number`  | [`NestedTypeNode`](./NestedTypeNode.md)<[`NumberTypeNode`](./NumberTypeNode.md)> | The numeric type used to serialise the timestamp. |
