# NoneValueNode

The "absent" value for an optional type.
For instance, this can be set as the default value of a field whose type is an `optionTypeNode`.

## Attributes

### Data

| Attribute | Type              | Description             |
| --------- | ----------------- | ----------------------- |
| `kind`    | `"noneValueNode"` | The node discriminator. |

## Examples

### Create a none value node

```typescript
const node = noneValueNode();
```
