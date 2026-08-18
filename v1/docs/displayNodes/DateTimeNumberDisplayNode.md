# DateTimeNumberDisplayNode

Display metadata that presents a number as a point in time.
The underlying value counts ticks since the Unix epoch; `ticksPerSecond` is the divisor that converts those ticks back to seconds.

## Attributes

### Data

| Attribute        | Type                          | Description                                                                        |
| ---------------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| `kind`           | `"dateTimeNumberDisplayNode"` | The node discriminator.                                                            |
| `ticksPerSecond` | `u64` _(optional)_            | How many ticks make one second. Defaults to `1` (the value is already in seconds). |

## Examples

### A Unix timestamp already in seconds

```typescript
numberTypeNode('i64', 'le', { display: dateTimeNumberDisplayNode({}) });

// 1_761_365_183 => "2025-10-25T04:06:23.000Z"
```

### A millisecond timestamp scaled back to seconds

```typescript
numberTypeNode('i64', 'le', { display: dateTimeNumberDisplayNode({ ticksPerSecond: 1000 }) });

// 1_761_365_183_000 => "2025-10-25T04:06:23.000Z"
```
