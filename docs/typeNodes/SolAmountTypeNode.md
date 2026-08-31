# SolAmountTypeNode

A SOL amount expressed in lamports under the wrapped numeric type.
Equivalent to an `amountTypeNode` with 9 decimals and `SOL` as the unit.

## Attributes

### Data

| Attribute | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| `kind`    | `"solAmountTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                                                             | Description                                            |
| --------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `number`  | [`NestedTypeNode`](./NestedTypeNode.md)<[`NumberTypeNode`](./NumberTypeNode.md)> | The numeric type used to serialise the lamport amount. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### u64 Solana amounts

```typescript
solAmountTypeNode(numberTypeNode('u64'));

// 1.5 SOL => 0x002F685900000000
// 300 SOL => 0x00B864D945000000
```
