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

| Attribute  | Type                                                                               | Description                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `decimals` | [`InjectableIntegerValueNode`](../valueNodes/InjectableIntegerValueNode.md)        | How many decimal places scale the underlying integer. Resolved as an integer value: either a literal `integerValueNode` or a key resolved from a surrounding provider. A value of `1000000` with `decimals` resolving to `6` renders as `1`. When this input cannot resolve, renderers should fall back to presenting the raw value rather than guess the scale. |
| `unit`     | [`InjectableUnitValueNode`](../valueNodes/InjectableUnitValueNode.md) _(optional)_ | A unit appended after the scaled value (e.g. `"USDC"`, `"%"`, `"bps"`, or the address of a token mint), presented as described by `InjectableUnitValueNode`. When this input cannot resolve, renderers should present the scaled value without a unit.                                                                                                           |
| `plugins`  | [`PluginNode`](../PluginNode.md)[] _(optional)_                                    | Namespaced plugins with custom structured data.                                                                                                                                                                                                                                                                                                                  |

## Examples

### Decimals and unit provided by the mint account of an instruction

```typescript
instructionNode({
    identifier: 'transfer',
    accounts: [
        instructionAccountNode({
            identifier: 'mint',
            isSigner: false,
            isWritable: false,
            accountLink: accountLinkNode('mint'),
        }),
    ],
    provides: [
        providedNode('decimals', accountDataValueNode('mint', 'decimals')),
        providedNode('mint', accountValueNode('mint')),
    ],
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'amount',
            type: integerTypeNode('u64', {
                display: amountNumberDisplayNode({
                    decimals: injectedValueNode({ key: 'decimals' }),
                    unit: injectedValueNode({ key: 'mint' }),
                }),
            }),
        }),
    ]),
});

// 1_500_000 with the USDC mint => "1.5 USDC",
// or "1.5 EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" when the renderer knows no name for the mint
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

### A literal address unit

```typescript
integerTypeNode('u64', {
    display: amountNumberDisplayNode({
        decimals: integerValueNode('6'),
        unit: publicKeyValueNode('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    }),
});

// 1_500_000 => "1.5 USDC" when the renderer names the USDC mint
```
