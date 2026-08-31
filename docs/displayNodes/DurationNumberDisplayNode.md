# DurationNumberDisplayNode

Display metadata that presents a number as an elapsed duration.
The underlying value counts ticks; `ticksPerSecond` is the divisor that converts those ticks back to seconds.
Renderers typically format the result as `HH:mm:ss` or a coarser human-readable form.

## Attributes

### Data

| Attribute        | Type                          | Description                                                                                                                                                                            |
| ---------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`           | `"durationNumberDisplayNode"` | The node discriminator.                                                                                                                                                                |
| `ticksPerSecond` | `u64` _(optional)_            | How many ticks make one second. Defaults to `1` (the value is already in seconds). Common choices are `1000` (milliseconds), `1000000` (microseconds), and `1000000000` (nanoseconds). |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A duration already in seconds

```typescript
numberTypeNode('u32', 'le', { display: durationNumberDisplayNode({}) });

// 3600 => "01:00:00"
```

### A duration in milliseconds scaled back to seconds

```typescript
numberTypeNode('u64', 'le', { display: durationNumberDisplayNode({ ticksPerSecond: 1000 }) });

// 90_000 => "00:01:30"
```
