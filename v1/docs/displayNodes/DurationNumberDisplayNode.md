# `DurationNumberDisplayNode`

Display metadata that presents a number as an elapsed duration. The underlying value counts ticks; `ticksPerSecond` is the divisor that converts those ticks back to seconds. Renderers typically format the result as `HH:mm:ss` or a coarser human-readable form.

## Attributes

### Data

| Attribute        | Type                          | Description                                                                        |
| ---------------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| `kind`           | `"durationNumberDisplayNode"` | The node discriminator.                                                            |
| `ticksPerSecond` | `u64` _(optional)_            | How many ticks make one second. Defaults to `1` (the value is already in seconds). |
