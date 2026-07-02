# `StructValueNode`

A concrete struct value: a list of named field values.

## Attributes

### Data

| Attribute | Type                | Description             |
| --------- | ------------------- | ----------------------- |
| `kind`    | `"structValueNode"` | The node discriminator. |

### Children

| Attribute | Type                                                  | Description                           |
| --------- | ----------------------------------------------------- | ------------------------------------- |
| `fields`  | [`StructFieldValueNode`](./StructFieldValueNode.md)[] | The named fields of the struct value. |
