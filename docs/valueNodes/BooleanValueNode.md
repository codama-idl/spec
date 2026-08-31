# BooleanValueNode

A concrete boolean value.

## Attributes

### Data

| Attribute | Type                 | Description             |
| --------- | -------------------- | ----------------------- |
| `kind`    | `"booleanValueNode"` | The node discriminator. |
| `boolean` | `boolean`            | The boolean value.      |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a boolean value node from a boolean

```typescript
const node = booleanValueNode(true);
```
