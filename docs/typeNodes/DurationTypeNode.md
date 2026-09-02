# DurationTypeNode

An elapsed duration encoded as an integer count of ticks.
Renderers typically format the value as `HH:mm:ss` or a coarser human-readable form.

## Attributes

### Data

| Attribute        | Type                 | Description                                                                                                                                                                            |
| ---------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`           | `"durationTypeNode"` | The node discriminator.                                                                                                                                                                |
| `ticksPerSecond` | `u64` _(optional)_   | How many ticks make one second. Defaults to `1` (the value is already in seconds). Common choices are `1000` (milliseconds), `1000000` (microseconds), and `1000000000` (nanoseconds). |

### Children

| Attribute    | Type                                                                 | Description                                                                                                                           |
| ------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `number`     | [`IntegerTypeNode`](./IntegerTypeNode.md)                            | The integer type used to serialise the tick count — a pure encoding slot. It must not carry a `unit` or `display` of its own.         |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_ | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                          |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                      | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A duration in seconds

```typescript
const node = durationTypeNode(integerTypeNode('u32'));

// 3661 => 01:01:01
```

### A duration in milliseconds

```typescript
durationTypeNode(integerTypeNode('u64'), { ticksPerSecond: 1000 });
```
