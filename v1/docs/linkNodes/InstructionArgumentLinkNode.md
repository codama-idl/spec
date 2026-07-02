# `InstructionArgumentLinkNode`

A reference to an argument of another instruction.

## Attributes

### Data

| Attribute | Type                            | Description                                      |
| --------- | ------------------------------- | ------------------------------------------------ |
| `kind`    | `"instructionArgumentLinkNode"` | The node discriminator.                          |
| `name`    | `CamelCaseString`               | The name of the referenced instruction argument. |

### Children

| Attribute     | Type                                                           | Description                                                                                               |
| ------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `instruction` | [`InstructionLinkNode`](./InstructionLinkNode.md) _(optional)_ | The instruction the referenced argument belongs to. When omitted, the surrounding instruction is assumed. |
