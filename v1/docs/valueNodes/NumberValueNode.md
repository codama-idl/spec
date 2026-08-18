# NumberValueNode

A concrete numeric value.
Stored as a 64-bit float; consumers narrow to a specific integer or float width based on the surrounding type context.

## Attributes

### Data

| Attribute | Type                | Description             |
| --------- | ------------------- | ----------------------- |
| `kind`    | `"numberValueNode"` | The node discriminator. |
| `number`  | `f64`               | The numeric value.      |

## Examples

### Create a number value node from a number

```typescript
const node = numberValueNode(42);
```
