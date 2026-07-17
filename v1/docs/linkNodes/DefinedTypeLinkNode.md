# DefinedTypeLinkNode

A reference to a defined type — possibly in a different program.

## Attributes

### Data

| Attribute | Type                    | Description                              |
| --------- | ----------------------- | ---------------------------------------- |
| `kind`    | `"definedTypeLinkNode"` | The node discriminator.                  |
| `name`    | `CamelCaseString`       | The name of the referenced defined type. |

### Children

| Attribute | Type                                                   | Description                                                                                      |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `program` | [`ProgramLinkNode`](./ProgramLinkNode.md) _(optional)_ | The program the referenced type is defined in. When omitted, the surrounding program is assumed. |
