# BytesTypeNode

A raw sequence of bytes. Typically used inside a fixed-size, size-prefixed, or sentinel-terminated wrapper.

## Attributes

### Data

| Attribute | Type              | Description             |
| --------- | ----------------- | ----------------------- |
| `kind`    | `"bytesTypeNode"` | The node discriminator. |

## Examples

### Create a bytes type node

```typescript
const node = bytesTypeNode();
```
