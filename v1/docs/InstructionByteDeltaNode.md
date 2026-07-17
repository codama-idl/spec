# InstructionByteDeltaNode

A byte-size delta applied when computing rent or buffer size — typically used by instructions that resize accounts.

## Attributes

### Data

| Attribute    | Type                         | Description                                                                                       |
| ------------ | ---------------------------- | ------------------------------------------------------------------------------------------------- |
| `kind`       | `"instructionByteDeltaNode"` | The node discriminator.                                                                           |
| `withHeader` | `boolean`                    | Whether the delta includes the account header overhead.                                           |
| `subtract`   | `boolean` _(optional)_       | When `true`, the delta is subtracted from the running size instead of added. Defaults to `false`. |

### Children

| Attribute | Type                                                          | Description                                                                                        |
| --------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `value`   | [`InstructionByteDeltaValue`](./InstructionByteDeltaValue.md) | The source of the delta value — a literal number, a referenced account or argument, or a resolver. |
