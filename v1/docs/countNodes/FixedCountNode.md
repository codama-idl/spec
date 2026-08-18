# FixedCountNode

A count strategy that fixes the number of items at a constant value.
This enables nodes such as `arrayTypeNode` to represent collections of a fixed length.

## Attributes

### Data

| Attribute | Type               | Description                |
| --------- | ------------------ | -------------------------- |
| `kind`    | `"fixedCountNode"` | The node discriminator.    |
| `value`   | `u64`              | The fixed number of items. |

## Examples

### Create a fixed count node from a number

```typescript
const node = fixedCountNode(42);
```

### An array of three public keys

```typescript
arrayTypeNode(publicKeyTypeNode(), fixedCountNode(3));
```
