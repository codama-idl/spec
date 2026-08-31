# BooleanValueNode

A concrete boolean value.

## Attributes

### Data

| Attribute | Type                 | Description             |
| --------- | -------------------- | ----------------------- |
| `kind`    | `"booleanValueNode"` | The node discriminator. |
| `boolean` | `boolean`            | The boolean value.      |

## Examples

### Create a boolean value node from a boolean

```typescript
const node = booleanValueNode(true);
```
