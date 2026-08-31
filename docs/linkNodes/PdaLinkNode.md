# PdaLinkNode

A reference to a PDA defined elsewhere — possibly in a different program.

## Attributes

### Data

| Attribute | Type              | Description                     |
| --------- | ----------------- | ------------------------------- |
| `kind`    | `"pdaLinkNode"`   | The node discriminator.         |
| `name`    | `CamelCaseString` | The name of the referenced PDA. |

### Children

| Attribute | Type                                                   | Description                                                                                  |
| --------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `program` | [`ProgramLinkNode`](./ProgramLinkNode.md) _(optional)_ | The program the referenced PDA belongs to. When omitted, the surrounding program is assumed. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a PDA link node from a PDA name

```typescript
const node = pdaLinkNode('myPda');
const nodeFromAnotherProgram = pdaLinkNode('myPda', 'myOtherProgram');
```
