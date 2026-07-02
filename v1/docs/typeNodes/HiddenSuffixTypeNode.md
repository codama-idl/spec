# `HiddenSuffixTypeNode`

Suffixes another type with a list of constant values that are written and read but not surfaced as fields to consumers.

## Attributes

### Data

| Attribute | Type                     | Description             |
| --------- | ------------------------ | ----------------------- |
| `kind`    | `"hiddenSuffixTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                                        | Description                                                            |
| --------- | ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| `type`    | [`TypeNode`](./TypeNode.md)                                 | The wrapped type whose serialisation is followed by the hidden suffix. |
| `suffix`  | [`ConstantValueNode`](../valueNodes/ConstantValueNode.md)[] | The constant values written after the wrapped type, in order.          |
