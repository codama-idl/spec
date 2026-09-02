# AmountNumberDisplayNode

Display metadata that presents an integer as a scaled amount with an optional unit, for quantities whose scale is contextual rather than static — e.g. a raw token amount whose decimals live in the mint account.
The value is divided by `10 ^ decimals` and rendered alongside `unit` (e.g. `"USDC"`, `"%"`, `"bps"`).
Statically scaled quantities belong on the type instead (`fixedPointTypeNode`); for a contextual unit without scaling, use `unitNumberDisplayNode`.
When both are present, a resolved display value wins for presentation; the type's static `unit` is the fallback whenever injection cannot resolve.

## Attributes

### Data

| Attribute | Type                        | Description             |
| --------- | --------------------------- | ----------------------- |
| `kind`    | `"amountNumberDisplayNode"` | The node discriminator. |

### Children

| Attribute  | Type                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `decimals` | [`InjectableIntegerValueNode`](../valueNodes/InjectableIntegerValueNode.md)            | How many decimal places scale the underlying integer. Resolved as an integer value: either a literal `integerValueNode` or a key resolved from a surrounding provider. A value of `1000000` with `decimals` resolving to `6` renders as `1`. When this input cannot resolve, renderers should fall back to presenting the raw value rather than guess the scale. |
| `unit`     | [`InjectableStringValueNode`](../valueNodes/InjectableStringValueNode.md) _(optional)_ | A label appended after the scaled value (e.g. `"USDC"`, `"%"`, `"bps"`). Resolved as a string value: either a literal `stringValueNode` or a key resolved from a surrounding provider. When this input cannot resolve, renderers should present the scaled value without a unit.                                                                                 |
| `plugins`  | [`PluginNode`](../PluginNode.md)[] _(optional)_                                        | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                                                                                                                                                                                                            |

## Examples

### Decimals and unit injected from surrounding account state

```typescript
integerTypeNode('u64', {
    display: amountNumberDisplayNode({
        decimals: injectedValueNode({ key: 'decimals' }),
        unit: injectedValueNode({ key: 'symbol' }),
    }),
});

// 1_500_000 with injected decimals 6 and symbol "USDC" => "1.5 USDC"
```

### An injected scale with a static fallback

```typescript
// Static scale and unit belong on the type instead — see fixedPointTypeNode.
integerTypeNode('u64', {
    display: amountNumberDisplayNode({
        decimals: injectedValueNode({ key: 'decimals', fallback: integerValueNode('0') }),
        unit: injectedValueNode({ key: 'symbol' }),
    }),
});
```
