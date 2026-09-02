# UnitNumberDisplayNode

Display metadata that labels a number with a contextually resolved unit, without any scaling.
The one presentation form valid on numbers whose scale is already fixed — floats (which self-scale) and `fixedPointTypeNode`s (whose `scale` is static) — and equally usable on plain integers.
When the type also carries a static `unit`, a resolved display unit wins for presentation; the type's unit is the fallback whenever injection cannot resolve.

## Attributes

### Data

| Attribute | Type                      | Description             |
| --------- | ------------------------- | ----------------------- |
| `kind`    | `"unitNumberDisplayNode"` | The node discriminator. |

### Children

| Attribute | Type                                                                      | Description                                                                                                                                                                                                                                                        |
| --------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `unit`    | [`InjectableStringValueNode`](../valueNodes/InjectableStringValueNode.md) | A label appended after the value (e.g. `"SOL"`, `"USDC"`, `"%"`). Resolved as a string value: either a literal `stringValueNode` or a key resolved from a surrounding provider. When this input cannot resolve, renderers should present the value without a unit. |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_                           | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                                                                                                              |

## Examples

### A fixed-point amount with a per-mint symbol

```typescript
fixedPointTypeNode(integerTypeNode('u64'), 9, {
    display: unitNumberDisplayNode(injectedValueNode({ key: 'symbol' })),
});

// 1_100_000_000 with the injected symbol "SOL" => "1.1 SOL"
```

### A float labelled with a contextual unit

```typescript
floatTypeNode('f64', {
    display: unitNumberDisplayNode(injectedValueNode({ key: 'currency' })),
});
```
