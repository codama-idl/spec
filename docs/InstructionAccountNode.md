# InstructionAccountNode

An account participating in an instruction, with its identifier, signing/writability flags, and an optional default value.

![Diagram](https://github.com/codama-idl/codama/assets/3642397/4656a08b-2f89-49c2-b428-5378cb1a0b9e)

## Attributes

### Data

| Attribute    | Type                        | Description                                                                                                                                                                                                  |
| ------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `kind`       | `"instructionAccountNode"`  | The node discriminator.                                                                                                                                                                                      |
| `identifier` | `IdentifierString`          | The identifier of the account.                                                                                                                                                                               |
| `isWritable` | `boolean`                   | Whether the instruction may write to the account.                                                                                                                                                            |
| `isSigner`   | `true \| false \| "either"` | Whether the account must sign the transaction. The literal `"either"` indicates a slot that may or may not sign depending on context.                                                                        |
| `isOptional` | `boolean` _(optional)_      | Whether the account slot may be omitted by callers. When `true`, absent accounts are handled according to the `optionalAccountStrategy` attribute of the surrounding `instructionNode`. Defaults to `false`. |
| `docs`       | `string[]` _(optional)_     | Markdown documentation for the account slot.                                                                                                                                                                 |

### Children

| Attribute      | Type                                                                                            | Description                                                                                                                                                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultValue` | [`InstructionInputValueNode`](./contextualValueNodes/InstructionInputValueNode.md) _(optional)_ | A default value used to fill the slot when the caller does not provide one.                                                                                                                                                        |
| `accountLink`  | [`AccountLinkNode`](./linkNodes/AccountLinkNode.md) _(optional)_                                | A reference to the account's data layout. Required for consumers (e.g. `accountDataValueNode`) to read fields from the account. The link's optional `program` allows cross-program references via the root's `additionalPrograms`. |
| `display`      | [`InstructionAccountDisplayNode`](./displayNodes/InstructionAccountDisplayNode.md) _(optional)_ | Display metadata describing how the account is presented.                                                                                                                                                                          |
| `plugins`      | [`PluginNode`](./PluginNode.md)[] _(optional)_                                                  | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                                                                              |

## Examples

### An optional account

```typescript
instructionAccountNode({
    identifier: 'freezeAuthority',
    isWritable: false,
    isSigner: false,
    isOptional: true,
    docs: ['The freeze authority to set on the asset, if any.'],
});
```

### An optional signer account

```typescript
instructionAccountNode({
    identifier: 'owner',
    isWritable: true,
    isSigner: 'either',
    docs: ['The owner of the asset. The owner must only sign the transaction if the asset is being updated.'],
});
```
