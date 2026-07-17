# InstructionStatusNode

The lifecycle stage of an instruction (draft, live, deprecated, archived) with an optional accompanying message.

## Attributes

### Data

| Attribute | Type                      | Description                                                                                  |
| --------- | ------------------------- | -------------------------------------------------------------------------------------------- |
| `kind`    | `"instructionStatusNode"` | The node discriminator.                                                                      |
| `message` | `string` _(optional)_     | Free-form prose accompanying the status — e.g. a deprecation notice with migration guidance. |

### Children

| Attribute   | Type                                                            | Description          |
| ----------- | --------------------------------------------------------------- | -------------------- |
| `lifecycle` | [`InstructionLifecycle`](./sharedNodes/InstructionLifecycle.md) | The lifecycle stage. |
