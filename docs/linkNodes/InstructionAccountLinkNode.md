# InstructionAccountLinkNode

A reference to an account of another instruction.

## Attributes

### Data

| Attribute    | Type                           | Description                                           |
| ------------ | ------------------------------ | ----------------------------------------------------- |
| `kind`       | `"instructionAccountLinkNode"` | The node discriminator.                               |
| `identifier` | `IdentifierString`             | The identifier of the referenced instruction account. |

### Children

| Attribute     | Type                                                           | Description                                                                                                                                                                      |
| ------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `instruction` | [`InstructionLinkNode`](./InstructionLinkNode.md) _(optional)_ | The instruction the referenced account belongs to. When omitted, the surrounding instruction is assumed. The instruction link may itself point to a different program if needed. |
| `plugins`     | [`PluginNode`](../PluginNode.md)[] _(optional)_                | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                            |

## Examples

### Create an instruction account link node from an account name

```typescript
// Links to an account in the current instruction.
const node = instructionAccountLinkNode('myAccount');

// Links to an account in another instruction but within the same program.
const nodeFromAnotherInstruction = instructionAccountLinkNode('myAccount', 'myOtherInstruction');

// Links to an account in another instruction from another program.
const nodeFromAnotherProgram = instructionAccountLinkNode(
    'myAccount',
    instructionLinkNode('myOtherInstruction', 'myOtherProgram'),
);
```
