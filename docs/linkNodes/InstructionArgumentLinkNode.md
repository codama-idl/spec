# InstructionArgumentLinkNode

A reference to an argument of another instruction.

## Attributes

### Data

| Attribute    | Type                            | Description                                            |
| ------------ | ------------------------------- | ------------------------------------------------------ |
| `kind`       | `"instructionArgumentLinkNode"` | The node discriminator.                                |
| `identifier` | `IdentifierString`              | The identifier of the referenced instruction argument. |

### Children

| Attribute     | Type                                                           | Description                                                                                                                                                                       |
| ------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `instruction` | [`InstructionLinkNode`](./InstructionLinkNode.md) _(optional)_ | The instruction the referenced argument belongs to. When omitted, the surrounding instruction is assumed. The instruction link may itself point to a different program if needed. |
| `plugins`     | [`PluginNode`](../PluginNode.md)[] _(optional)_                | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                             |

## Examples

### Create an instruction argument link node from an argument name

```typescript
// Links to an argument in the current instruction.
const node = instructionArgumentLinkNode('myArgument');

// Links to an argument in another instruction but within the same program.
const nodeFromAnotherInstruction = instructionArgumentLinkNode('myArgument', 'myOtherInstruction');

// Links to an argument in another instruction from another program.
const nodeFromAnotherProgram = instructionArgumentLinkNode(
    'myArgument',
    instructionLinkNode('myOtherInstruction', 'myOtherProgram'),
);
```
