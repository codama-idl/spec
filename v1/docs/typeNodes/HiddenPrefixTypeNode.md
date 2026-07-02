# `HiddenPrefixTypeNode`

Prefixes another type with a list of constant values that are written and read but not surfaced as fields to consumers.

## Attributes

### Data

| Attribute | Type                     | Description             |
| --------- | ------------------------ | ----------------------- |
| `kind`    | `"hiddenPrefixTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                                        | Description                                                            |
| --------- | ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| `type`    | [`TypeNode`](./TypeNode.md)                                 | The wrapped type whose serialisation is preceded by the hidden prefix. |
| `prefix`  | [`ConstantValueNode`](../valueNodes/ConstantValueNode.md)[] | The constant values written before the wrapped type, in order.         |
