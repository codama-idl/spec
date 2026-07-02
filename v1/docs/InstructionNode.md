# `InstructionNode`

A program instruction: its accounts, arguments, byte-delta hints, discriminators, optional status, and optional sub-instructions.

## Attributes

### Data

| Attribute | Type                    | Description                                 |
| --------- | ----------------------- | ------------------------------------------- |
| `kind`    | `"instructionNode"`     | The node discriminator.                     |
| `name`    | `CamelCaseString`       | The name of the instruction.                |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the instruction. |

### Children

| Attribute                 | Type                                                                                       | Description                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `optionalAccountStrategy` | [`OptionalAccountStrategy`](./sharedNodes/OptionalAccountStrategy.md) _(optional)_         | How absent optional accounts are represented when serialising the instruction.                            |
| `accounts`                | [`InstructionAccountNode`](./InstructionAccountNode.md)[]                                  | The accounts the instruction operates on, in order.                                                       |
| `arguments`               | [`InstructionArgumentNode`](./InstructionArgumentNode.md)[]                                | The serialised arguments of the instruction, in order.                                                    |
| `extraArguments`          | [`InstructionArgumentNode`](./InstructionArgumentNode.md)[] _(optional)_                   | Additional arguments exposed in the generated client API but not serialised on the wire.                  |
| `remainingAccounts`       | [`InstructionRemainingAccountsNode`](./InstructionRemainingAccountsNode.md)[] _(optional)_ | Variable-length tails of accounts appended after the named account slots.                                 |
| `byteDeltas`              | [`InstructionByteDeltaNode`](./InstructionByteDeltaNode.md)[] _(optional)_                 | Byte-size adjustments applied when computing rent or buffer size — for instructions that resize accounts. |
| `discriminators`          | [`DiscriminatorNode`](./discriminatorNodes/DiscriminatorNode.md)[] _(optional)_            | Discriminators that distinguish this instruction from others.                                             |
| `status`                  | [`InstructionStatusNode`](./InstructionStatusNode.md) _(optional)_                         | The lifecycle status of the instruction.                                                                  |
| `subInstructions`         | [`InstructionNode`](./InstructionNode.md)[] _(optional)_                                   | Inner instructions invoked through CPI as part of executing this instruction.                             |
| `provides`                | [`ProvidedNode`](./ProvidedNode.md)[] _(optional)_                                         | Named nodes exposed to consumers in the surrounding scope.                                                |
| `display`                 | [`InstructionDisplayNode`](./displayNodes/InstructionDisplayNode.md) _(optional)_          | Display metadata describing how the instruction is presented.                                             |
| `plugins`                 | [`PluginNode`](./PluginNode.md)[] _(optional)_                                             | Namespaced plugins with custom structured data.                                                           |
