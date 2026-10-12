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

| Attribute | Type                                                                  | Description                                                                                                                                                                                                                              |
| --------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unit`    | [`InjectableUnitValueNode`](../valueNodes/InjectableUnitValueNode.md) | A unit appended after the value (e.g. `"SOL"`, `"USDC"`, `"%"`, or the address of a token mint), presented as described by `InjectableUnitValueNode`. When this input cannot resolve, renderers should present the value without a unit. |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_                       | Namespaced plugins with custom structured data.                                                                                                                                                                                          |

## Examples

### A fixed-point amount with its mint as unit

```typescript
fixedPointTypeNode(integerTypeNode('u64'), {
    display: unitNumberDisplayNode({ unit: injectedValueNode({ key: 'mint' }) }),
    scale: 9,
});

// 1_100_000_000 with the wrapped SOL mint injected => "1.1 SOL" when the renderer names the mint
```

### A float labelled with a contextual unit

```typescript
floatTypeNode('f64', {
    display: unitNumberDisplayNode({ unit: injectedValueNode({ key: 'currency' }) }),
});
```
