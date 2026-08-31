# InstructionLinkNode

A reference to an instruction defined elsewhere — possibly in a different program.

## Attributes

### Data

| Attribute | Type                    | Description                             |
| --------- | ----------------------- | --------------------------------------- |
| `kind`    | `"instructionLinkNode"` | The node discriminator.                 |
| `name`    | `CamelCaseString`       | The name of the referenced instruction. |

### Children

| Attribute | Type                                                   | Description                                                                                                                           |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `program` | [`ProgramLinkNode`](./ProgramLinkNode.md) _(optional)_ | The program the referenced instruction belongs to. When omitted, the surrounding program is assumed.                                  |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_        | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an instruction link node from an instruction name

```typescript
const node = instructionLinkNode('myInstruction');
const nodeFromAnotherProgram = instructionLinkNode('myInstruction', 'myOtherProgram');
```
