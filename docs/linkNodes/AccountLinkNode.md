# AccountLinkNode

A reference to an account defined elsewhere — possibly in a different program.

## Attributes

### Data

| Attribute    | Type                | Description                               |
| ------------ | ------------------- | ----------------------------------------- |
| `kind`       | `"accountLinkNode"` | The node discriminator.                   |
| `identifier` | `IdentifierString`  | The identifier of the referenced account. |

### Children

| Attribute | Type                                                   | Description                                                                                                                           |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `program` | [`ProgramLinkNode`](./ProgramLinkNode.md) _(optional)_ | The program the referenced account belongs to. When omitted, the surrounding program is assumed.                                      |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_        | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an account link node from an account name

```typescript
const node = accountLinkNode('myAccount');
const nodeFromAnotherProgram = accountLinkNode('myAccount', 'myOtherProgram');
```
