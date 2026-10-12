---
'@codama/spec': minor
---

Let display units reference an address. The `unit` of `amountNumberDisplayNode` and `unitNumberDisplayNode` now accepts a literal `publicKeyValueNode` or an injection resolving to an address, on top of strings. Renderers present an address unit under whatever name they know for it, e.g. a token symbol for a mint, and as the address itself otherwise. The new `injectableUnitValueNode` union replaces `injectableStringValueNode`.

```ts
amountNumberDisplayNode({
    decimals: injectedValueNode({ key: 'decimals' }),
    unit: injectedValueNode({ key: 'mint' }), // => "1.5 USDC", or "1.5 EPjF…Dt1v" when unnamed
});
```
