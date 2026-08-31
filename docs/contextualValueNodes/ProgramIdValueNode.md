# ProgramIdValueNode

Refers to the program ID of the surrounding instruction — that is, the address of the `programNode` this node descends from.

## Attributes

### Data

| Attribute | Type                   | Description             |
| --------- | ---------------------- | ----------------------- |
| `kind`    | `"programIdValueNode"` | The node discriminator. |

## Examples

### Create a program id value node

```typescript
const node = programIdValueNode();
```
