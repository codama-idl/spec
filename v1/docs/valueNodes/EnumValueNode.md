# `EnumValueNode`

A concrete value of a defined enum: a variant identifier plus an optional payload.

## Attributes

### Data

| Attribute | Type              | Description                       |
| --------- | ----------------- | --------------------------------- |
| `kind`    | `"enumValueNode"` | The node discriminator.           |
| `variant` | `CamelCaseString` | The name of the selected variant. |

### Children

| Attribute | Type                                                         | Description                                                                                   |
| --------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `enum`    | [`DefinedTypeLinkNode`](../linkNodes/DefinedTypeLinkNode.md) | A link to the defined enum type the value belongs to.                                         |
| `value`   | [`EnumValuePayload`](./EnumValuePayload.md) _(optional)_     | The variant payload — a struct value for struct variants or a tuple value for tuple variants. |
