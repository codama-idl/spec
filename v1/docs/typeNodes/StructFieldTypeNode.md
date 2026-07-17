# StructFieldTypeNode

A named field within a struct type.

## Attributes

### Data

| Attribute | Type                    | Description                           |
| --------- | ----------------------- | ------------------------------------- |
| `kind`    | `"structFieldTypeNode"` | The node discriminator.               |
| `name`    | `CamelCaseString`       | The name of the field.                |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the field. |

### Children

| Attribute              | Type                                                                               | Description                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `defaultValueStrategy` | [`DefaultValueStrategy`](../sharedNodes/DefaultValueStrategy.md) _(optional)_      | How a configured default value is exposed in generated APIs. Required when `defaultValue` is set. |
| `type`                 | [`TypeNode`](./TypeNode.md)                                                        | The type of the field.                                                                            |
| `defaultValue`         | [`ValueNode`](../valueNodes/ValueNode.md) _(optional)_                             | A default value used when the field is omitted by callers.                                        |
| `display`              | [`StructFieldDisplayNode`](../displayNodes/StructFieldDisplayNode.md) _(optional)_ | Display metadata describing how the field is presented.                                           |
