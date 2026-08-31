# NumberValueNode

A concrete numeric value.
Stored as a 64-bit float; consumers narrow to a specific integer or float width based on the surrounding type context.

## Attributes

### Data

| Attribute | Type                | Description             |
| --------- | ------------------- | ----------------------- |
| `kind`    | `"numberValueNode"` | The node discriminator. |
| `number`  | `f64`               | The numeric value.      |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a number value node from a number

```typescript
const node = numberValueNode(42);
```
