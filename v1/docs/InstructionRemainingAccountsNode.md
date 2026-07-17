# InstructionRemainingAccountsNode

A "remaining accounts" slot in an instruction — a variable-length tail of accounts derived from a value.

## Attributes

### Data

| Attribute    | Type                                     | Description                                                  |
| ------------ | ---------------------------------------- | ------------------------------------------------------------ |
| `kind`       | `"instructionRemainingAccountsNode"`     | The node discriminator.                                      |
| `isOptional` | `boolean` _(optional)_                   | Whether the remaining-accounts tail may be empty.            |
| `isSigner`   | `true \| false \| "either"` _(optional)_ | Whether each remaining account must sign the transaction.    |
| `isWritable` | `boolean` _(optional)_                   | Whether the instruction may write to each remaining account. |
| `docs`       | `string[]` _(optional)_                  | Markdown documentation for the remaining-accounts slot.      |

### Children

| Attribute | Type                                                                                            | Description                                                                           |
| --------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `value`   | [`InstructionRemainingAccountsValue`](./InstructionRemainingAccountsValue.md)                   | The source of the remaining-accounts list — a referenced argument or a resolver.      |
| `display` | [`InstructionAccountDisplayNode`](./displayNodes/InstructionAccountDisplayNode.md) _(optional)_ | Display metadata describing how the remaining-accounts group is presented as a whole. |
