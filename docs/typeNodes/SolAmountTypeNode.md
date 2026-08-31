# SolAmountTypeNode

A SOL amount expressed in lamports under the inner numeric type.
Equivalent to an `amountTypeNode` with 9 decimals and `SOL` as the unit.

## Attributes

### Data

| Attribute | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| `kind`    | `"solAmountTypeNode"` | The node discriminator. |

### Children

| Attribute    | Type                                                                 | Description                                                                                                                           |
| ------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `number`     | [`NumberTypeNode`](./NumberTypeNode.md)                              | The numeric type used to serialise the lamport amount.                                                                                |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_ | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                          |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                      | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### u64 Solana amounts

```typescript
solAmountTypeNode(numberTypeNode('u64'));

// 1.5 SOL => 0x002F685900000000
// 300 SOL => 0x00B864D945000000
```
