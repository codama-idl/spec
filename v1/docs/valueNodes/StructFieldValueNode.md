# `StructFieldValueNode`

A named field of a `structValueNode`.

## Attributes

### Data

| Attribute | Type                     | Description             |
| --------- | ------------------------ | ----------------------- |
| `kind`    | `"structFieldValueNode"` | The node discriminator. |
| `name`    | `CamelCaseString`        | The name of the field.  |

### Children

| Attribute | Type                          | Description                      |
| --------- | ----------------------------- | -------------------------------- |
| `value`   | [`ValueNode`](./ValueNode.md) | The concrete value of the field. |
