# DateTimeTypeNode

A point in time encoded as an integer count of ticks since the Unix epoch.

## Attributes

### Data

| Attribute        | Type                 | Description                                                                                                                                                                                    |
| ---------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`           | `"dateTimeTypeNode"` | The node discriminator.                                                                                                                                                                        |
| `ticksPerSecond` | `u64` _(optional)_   | How many ticks make one second. Defaults to `1` (the value is in seconds since the epoch). Common choices are `1000` (milliseconds), `1000000` (microseconds), and `1000000000` (nanoseconds). |

### Children

| Attribute    | Type                                                                 | Description                                                                                                                           |
| ------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `number`     | [`IntegerTypeNode`](./IntegerTypeNode.md)                            | The integer type used to serialise the tick count — a pure encoding slot. It must not carry a `unit` or `display` of its own.         |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_ | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                          |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                      | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A u64 unix timestamp in seconds

```typescript
const node = dateTimeTypeNode(integerTypeNode('u64'));

// 2024-06-27T14:57:56Z => 0xF47D7D6600000000
```

### An i64 unix timestamp in milliseconds

```typescript
dateTimeTypeNode(integerTypeNode('i64'), { ticksPerSecond: 1000 });
```
