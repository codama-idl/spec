# ProgramLinkNode

A reference to a program by name.

## Attributes

### Data

| Attribute    | Type                | Description                               |
| ------------ | ------------------- | ----------------------------------------- |
| `kind`       | `"programLinkNode"` | The node discriminator.                   |
| `identifier` | `IdentifierString`  | The identifier of the referenced program. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a program link node from a program name

```typescript
const node = programLinkNode('myProgram');
```
