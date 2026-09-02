---
'@codama/spec': major
---

Rework the numeric system so every numeric fact lives in exactly one layer. Types split into pure numbers and quantities, values become string-encoded and therefore lossless, and time semantics move from the display layer to the type layer.

**BREAKING CHANGES**

**`numberTypeNode` splits into `integerTypeNode` and `floatTypeNode`.** Each carries its own format enumeration (`integerFormat` = `u8`–`u128`, `i8`–`i128`, `shortU16`; `floatFormat` = `f32`, `f64`), an `endian` that is now optional and defaults to `le` (byte-oriented formats such as `shortU16` ignore it), and an optional `unit` naming the quantity the number denotes. Every position that only makes sense as an integer — size and count prefixes, enum and boolean sizes, option prefixes, the backing number of quantity types — now references `integerTypeNode` by construction.

```diff
- numberTypeNode('u64', 'le')
+ integerTypeNode('u64')
- numberTypeNode('f64', 'le')
+ floatTypeNode('f64')
```

**`numberValueNode` splits into string-encoded `integerValueNode` and `floatValueNode`.** Integer values are `IntegerString`s (`0|-?[1-9][0-9]*` — one spelling per integer), so the full 64- and 128-bit ranges survive JSON transport — a `u64` discriminator no longer corrupts at parse time. Float values are `DecimalString`s, making round-trips deterministic across serialisers. The `injectableNumberValueNode` union becomes `injectableIntegerValueNode`, and the byte-delta union's number member becomes `integerValueNode`.

```diff
- numberValueNode(12048014319693667524)   // silently becomes 12048014319693668352
+ integerValueNode('12048014319693667524') // lossless — the quotes are load-bearing
```

**`amountTypeNode` and `solAmountTypeNode` are replaced by `fixedPointTypeNode`.** A scaled quantity is `raw / base^scale`, with `scale` (non-zero), an optional `base` of `2` or `10` (default `10`, covering binary Q-format fractions), an optional `unit`, and an inner `integerTypeNode` that is a pure encoding slot (fixed-size formats only, no `unit` or `display` of its own). An unscaled quantity is an `integerTypeNode` with a `unit` — every meaning has exactly one spelling.

```diff
- amountTypeNode(6, 'USDC', numberTypeNode('u64'))
+ fixedPointTypeNode(integerTypeNode('u64'), 6, { unit: 'USDC' })
- solAmountTypeNode(numberTypeNode('u64'))
+ fixedPointTypeNode(integerTypeNode('u64'), 9, { unit: 'SOL' })
- amountTypeNode(0, 'slots', numberTypeNode('u64'))
+ integerTypeNode('u64', { unit: 'slots' })
```

**`dateTimeNumberDisplayNode` and `durationNumberDisplayNode` move to the type layer.** Their `ticksPerSecond` changes the moment or duration a value denotes — value semantics, not presentation. `dateTimeTypeNode` gains `ticksPerSecond` (default `1`) and a new `durationTypeNode` joins it; both wrap an `integerTypeNode` encoding slot. `amountNumberDisplayNode` remains as the contextual channel — for quantities whose scale or unit resolve at presentation time via injection (e.g. per-mint decimals) — and its docs now state that static facts belong on the type.

```diff
- numberTypeNode('i64', { display: dateTimeNumberDisplayNode(1000) })
+ dateTimeTypeNode(integerTypeNode('i64'), { ticksPerSecond: 1000 })
- numberTypeNode('u32', { display: durationNumberDisplayNode() })
+ durationTypeNode(integerTypeNode('u32'))
```

Attribute-level integers (`size`, `offset`, counts, `ticksPerSecond`) stay JSON numbers: they are bounded in practice, unlike program data values, which span the full 64/128-bit ranges. Supersedes the corruption analysis in #97 — its string-`raw` essence ships here, with scaling moved to the type side where the value semantics live.
