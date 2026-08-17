# SolAmountTypeNode

A SOL amount expressed in lamports under the wrapped numeric type.

## Attributes

### Data

| Attribute | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| `kind`    | `"solAmountTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                                                             | Description                                            |
| --------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `number`  | [`NestedTypeNode`](./NestedTypeNode.md)<[`NumberTypeNode`](./NumberTypeNode.md)> | The numeric type used to serialise the lamport amount. |

## Examples

### u64 Solana amounts

```typescript
solAmountTypeNode(numberTypeNode('u64'));

// 1.5 SOL => 0x002F685900000000
// 300 SOL => 0x00B864D945000000
```
