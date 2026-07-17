# DefinedTypeNode

A reusable named type that can be referenced by `definedTypeLinkNode` from elsewhere in the IDL.

## Attributes

### Data

| Attribute | Type                    | Description                          |
| --------- | ----------------------- | ------------------------------------ |
| `kind`    | `"definedTypeNode"`     | The node discriminator.              |
| `name`    | `CamelCaseString`       | The name of the defined type.        |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the type. |

### Children

| Attribute | Type                                  | Description          |
| --------- | ------------------------------------- | -------------------- |
| `type`    | [`TypeNode`](./typeNodes/TypeNode.md) | The type definition. |
