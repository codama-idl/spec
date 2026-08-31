# AmountNumberDisplayNode

Display metadata that presents a number as a scaled amount with an optional unit.
The value is divided by `10 ^ decimals` and rendered alongside `unit` (e.g. `"USDC"`, `"%"`, `"bps"`).

## Attributes

### Data

| Attribute | Type                        | Description             |
| --------- | --------------------------- | ----------------------- |
| `kind`    | `"amountNumberDisplayNode"` | The node discriminator. |

### Children

| Attribute  | Type                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `decimals` | [`InjectableNumberValueNode`](../valueNodes/InjectableNumberValueNode.md) _(optional)_ | How many decimal places scale the underlying integer. Resolved as a number value: either a literal `numberValueNode` or a key resolved from a surrounding provider. A value of `1000000` with `decimals` resolving to `6` renders as `1`. When this input cannot resolve, renderers should fall back to presenting the raw value rather than guess the scale. |
| `unit`     | [`InjectableStringValueNode`](../valueNodes/InjectableStringValueNode.md) _(optional)_ | A label appended after the scaled value (e.g. `"USDC"`, `"%"`, `"bps"`). Resolved as a string value: either a literal `stringValueNode` or a key resolved from a surrounding provider. When this input cannot resolve, renderers should present the scaled value without a unit.                                                                              |
| `plugins`  | [`PluginNode`](../PluginNode.md)[] _(optional)_                                        | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                                                                                                                                                                                                         |

## Examples

### A fixed 9-decimal SOL amount

```typescript
numberTypeNode('u64', 'le', {
    display: amountNumberDisplayNode({ decimals: numberValueNode(9), unit: stringValueNode('SOL') }),
});

// 1_100_000_000 => "1.1 SOL"
```

### Decimals and unit injected from surrounding account state

```typescript
numberTypeNode('u64', 'le', {
    display: amountNumberDisplayNode({
        decimals: injectedValueNode({ key: 'decimals' }),
        unit: injectedValueNode({ key: 'symbol' }),
    }),
});

// 1_500_000 with injected decimals 6 and symbol "USDC" => "1.5 USDC"
```
