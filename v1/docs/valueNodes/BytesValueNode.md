# `BytesValueNode`

A concrete bytes value, encoded as text in the chosen encoding.

## Attributes

### Data

| Attribute | Type               | Description                                                      |
| --------- | ------------------ | ---------------------------------------------------------------- |
| `kind`    | `"bytesValueNode"` | The node discriminator.                                          |
| `data`    | `string`           | The bytes encoded as a text string per the `encoding` attribute. |

### Children

| Attribute  | Type                                               | Description                                       |
| ---------- | -------------------------------------------------- | ------------------------------------------------- |
| `encoding` | [`BytesEncoding`](../sharedNodes/BytesEncoding.md) | The encoding used to represent the bytes as text. |
