# ProgramIdValueNode

Refers to the program ID of the surrounding instruction — that is, the address of the `programNode` this node descends from.

## Attributes

### Data

| Attribute | Type                   | Description             |
| --------- | ---------------------- | ----------------------- |
| `kind`    | `"programIdValueNode"` | The node discriminator. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a program id value node

```typescript
const node = programIdValueNode();
```
