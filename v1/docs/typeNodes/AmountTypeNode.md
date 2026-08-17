# AmountTypeNode

Wraps a number type to provide additional context such as decimal places and a unit. Useful for amounts representing financial values.

## Attributes

### Data

| Attribute  | Type                  | Description                                               |
| ---------- | --------------------- | --------------------------------------------------------- |
| `kind`     | `"amountTypeNode"`    | The node discriminator.                                   |
| `decimals` | `u32`                 | The number of decimal places the wrapped integer carries. |
| `unit`     | `string` _(optional)_ | The unit of the amount — e.g. "USD" or "%".               |

### Children

| Attribute | Type                                                                             | Description                       |
| --------- | -------------------------------------------------------------------------------- | --------------------------------- |
| `number`  | [`NestedTypeNode`](./NestedTypeNode.md)<[`NumberTypeNode`](./NumberTypeNode.md)> | The number type the amount wraps. |

## Examples

### 2-decimals USD amount

```typescript
amountTypeNode(numberTypeNode('u32'), 2, 'USD');

// 0.01 USD   => 0x01000000
// 10 USD     => 0xE8030000
// 400.60 USD => 0x7C9C0000
```
