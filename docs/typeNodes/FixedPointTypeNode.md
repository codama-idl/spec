# FixedPointTypeNode

A scaled quantity stored as an integer: the value is `raw / base^scale`.
Integers are the safe way to carry financial values; this node adds the scaling and unit that give the raw integer its meaning — e.g. token amounts, prices, or binary Q-format fractions.

## Attributes

### Data

| Attribute | Type                   | Description                                                                                                                                                                                            |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `kind`    | `"fixedPointTypeNode"` | The node discriminator.                                                                                                                                                                                |
| `scale`   | `u32`                  | How many powers of `base` divide the raw integer. An integer value of 12345 with a base-10 scale of 2 represents 123.45. Must be non-zero: an unscaled quantity is an `integerTypeNode` with a `unit`. |
| `base`    | `2 \| 10` _(optional)_ | The base the scale applies to. Defaults to `10`; use `2` for binary Q-format fractions.                                                                                                                |
| `unit`    | `string` _(optional)_  | The unit of measure the quantity denotes — e.g. `"SOL"`, `"USDC"` or `"%"`.                                                                                                                            |

### Children

| Attribute    | Type                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `number`     | [`IntegerTypeNode`](./IntegerTypeNode.md)                                | The integer type used to serialise the raw value — a pure encoding slot. It must use a fixed-size format, because a fixed point presupposes a fixed bit width — most visibly for binary Q-format fractions, whose layout is defined by that width. Variable-size formats such as `shortU16` therefore cannot anchor one. It must not carry a `unit` or `display` of its own. |
| `display`    | [`NumberDisplayNode`](../displayNodes/NumberDisplayNode.md) _(optional)_ | Display metadata describing how the quantity is presented — e.g. a contextual unit resolved via injection on top of the static scale.                                                                                                                                                                                                                                        |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_     | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                                                                                                                                                                                                                                                                 |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                          | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                                                                                                                                                                                                                        |

## Examples

### A token amount with 6 decimal places

```typescript
const node = fixedPointTypeNode(integerTypeNode('u64'), 6, { unit: 'USDC' });

// 1500000 => 1.5 USDC
```

### A SOL amount expressed in lamports

```typescript
fixedPointTypeNode(integerTypeNode('u64'), 9, { unit: 'SOL' });

// 1000000000 => 1 SOL
```

### A binary Q64.64 fraction

```typescript
fixedPointTypeNode(integerTypeNode('u128'), 64, { base: 2 });

// raw / 2^64
```
