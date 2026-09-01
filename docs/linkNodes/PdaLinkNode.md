# PdaLinkNode

A reference to a PDA defined elsewhere — possibly in a different program.

## Attributes

### Data

| Attribute    | Type               | Description                           |
| ------------ | ------------------ | ------------------------------------- |
| `kind`       | `"pdaLinkNode"`    | The node discriminator.               |
| `identifier` | `IdentifierString` | The identifier of the referenced PDA. |

### Children

| Attribute | Type                                                   | Description                                                                                                                           |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `program` | [`ProgramLinkNode`](./ProgramLinkNode.md) _(optional)_ | The program the referenced PDA belongs to. When omitted, the surrounding program is assumed.                                          |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_        | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a PDA link node from a PDA name

```typescript
const node = pdaLinkNode('myPda');
const nodeFromAnotherProgram = pdaLinkNode('myPda', 'myOtherProgram');
```
