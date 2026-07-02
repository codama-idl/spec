# `VariablePdaSeedNode`

A PDA seed whose value is provided at derivation time, identified by name.

## Attributes

### Data

| Attribute | Type                    | Description                                   |
| --------- | ----------------------- | --------------------------------------------- |
| `kind`    | `"variablePdaSeedNode"` | The node discriminator.                       |
| `name`    | `CamelCaseString`       | The name of the seed variable.                |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the seed variable. |

### Children

| Attribute | Type                                   | Description                          |
| --------- | -------------------------------------- | ------------------------------------ |
| `type`    | [`TypeNode`](../typeNodes/TypeNode.md) | The expected type of the seed value. |
