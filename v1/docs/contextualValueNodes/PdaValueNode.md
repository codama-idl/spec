# PdaValueNode

Resolves to a PDA derived from a list of seed values.

## Attributes

### Data

| Attribute | Type             | Description             |
| --------- | ---------------- | ----------------------- |
| `kind`    | `"pdaValueNode"` | The node discriminator. |

### Children

| Attribute   | Type                                                       | Description                                                                              |
| ----------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `pda`       | [`PdaValuePda`](./PdaValuePda.md)                          | The PDA being derived — either a link to a defined PDA or an inline `pdaNode`.           |
| `seeds`     | [`PdaSeedValueNode`](./PdaSeedValueNode.md)[]              | The seed values used to derive the PDA, paired with their seed names.                    |
| `programId` | [`PdaValueProgramId`](./PdaValueProgramId.md) _(optional)_ | The program ID used to derive the PDA. When omitted, the PDA’s declared program is used. |
