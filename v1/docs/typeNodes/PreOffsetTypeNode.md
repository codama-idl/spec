# PreOffsetTypeNode

Before serialising the wrapped type, advance the cursor by `offset` bytes interpreted via the chosen strategy.

## Attributes

### Data

| Attribute | Type                  | Description                                                   |
| --------- | --------------------- | ------------------------------------------------------------- |
| `kind`    | `"preOffsetTypeNode"` | The node discriminator.                                       |
| `offset`  | `i64`                 | The signed byte offset to apply before the wrapped type runs. |

### Children

| Attribute  | Type                                                       | Description                                                     |
| ---------- | ---------------------------------------------------------- | --------------------------------------------------------------- |
| `strategy` | [`PreOffsetStrategy`](../sharedNodes/PreOffsetStrategy.md) | How the `offset` value is interpreted.                          |
| `type`     | [`TypeNode`](./TypeNode.md)                                | The wrapped type whose serialisation is preceded by the offset. |
