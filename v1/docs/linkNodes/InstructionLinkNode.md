# `InstructionLinkNode`

A reference to an instruction defined elsewhere — possibly in a different program.

## Attributes

### Data

| Attribute | Type                    | Description                             |
| --------- | ----------------------- | --------------------------------------- |
| `kind`    | `"instructionLinkNode"` | The node discriminator.                 |
| `name`    | `CamelCaseString`       | The name of the referenced instruction. |

### Children

| Attribute | Type                                                   | Description                                                                                          |
| --------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `program` | [`ProgramLinkNode`](./ProgramLinkNode.md) _(optional)_ | The program the referenced instruction belongs to. When omitted, the surrounding program is assumed. |
