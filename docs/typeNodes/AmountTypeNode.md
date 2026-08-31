# AmountTypeNode

Wraps a number type to provide additional context such as decimal places and a unit.
Particularly useful for representing financial values as integers, since floating-point numbers are notoriously unsafe for that purpose.

## Attributes

### Data

| Attribute  | Type                  | Description                                                                                                                               |
| ---------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`     | `"amountTypeNode"`    | The node discriminator.                                                                                                                   |
| `decimals` | `u32`                 | The number of decimal places the wrapped integer carries. For example, an integer value of 12345 with 2 decimal places represents 123.45. |
| `unit`     | `string` _(optional)_ | The unit of the amount — e.g. "USD" or "%".                                                                                               |

### Children

| Attribute | Type                                                                             | Description                       |
| --------- | -------------------------------------------------------------------------------- | --------------------------------- |
| `number`  | [`NestedTypeNode`](./NestedTypeNode.md)<[`NumberTypeNode`](./NumberTypeNode.md)> | The number type the amount wraps. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### 2-decimals USD amount

```typescript
amountTypeNode(numberTypeNode('u32'), 2, 'USD');

// 0.01 USD   => 0x01000000
// 10 USD     => 0xE8030000
// 400.60 USD => 0x7C9C0000
```
