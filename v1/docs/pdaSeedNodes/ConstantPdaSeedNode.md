# `ConstantPdaSeedNode`

A PDA seed with a constant value (e.g. a UTF-8 string or a fixed byte sequence).

## Attributes

### Data

| Attribute | Type                    | Description             |
| --------- | ----------------------- | ----------------------- |
| `kind`    | `"constantPdaSeedNode"` | The node discriminator. |

### Children

| Attribute | Type                                                | Description                                                                                   |
| --------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `type`    | [`TypeNode`](../typeNodes/TypeNode.md)              | The type of the seed value.                                                                   |
| `value`   | [`ConstantPdaSeedValue`](./ConstantPdaSeedValue.md) | The constant value to use as the seed — either a literal value or the program ID placeholder. |
