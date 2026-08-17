# ProgramLinkNode

A reference to a program by name.

## Attributes

### Data

| Attribute | Type                | Description                         |
| --------- | ------------------- | ----------------------------------- |
| `kind`    | `"programLinkNode"` | The node discriminator.             |
| `name`    | `CamelCaseString`   | The name of the referenced program. |

## Examples

### Create a program link node from a program name

```typescript
const node = programLinkNode('myProgram');
```
