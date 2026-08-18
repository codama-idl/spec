# RemainderCountNode

A count strategy where items are read until the buffer is exhausted.
When encoding, items are serialised as-is and the total count is never stored; when decoding, items are read one by one until the end of the buffer.
This strategy is therefore only meaningful for the last variable-size region of a buffer.

## Attributes

### Data

| Attribute | Type                   | Description             |
| --------- | ---------------------- | ----------------------- |
| `kind`    | `"remainderCountNode"` | The node discriminator. |

## Examples

### Create a remainder count node

```typescript
const node = remainderCountNode();
```

### A remainder array of public keys

```typescript
arrayTypeNode(publicKeyTypeNode(), remainderCountNode());
```
