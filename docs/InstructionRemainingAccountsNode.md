# InstructionRemainingAccountsNode

A "remaining accounts" slot in an instruction — a variable-length tail of accounts appended after the named account slots.
Like `instructionAccountNode`, it declares a client input: the identifier names the account-list input exposed to callers. Renderers with matching plugins may fill it automatically.

## Attributes

### Data

| Attribute    | Type                                     | Description                                                                                                                                                                                |
| ------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `kind`       | `"instructionRemainingAccountsNode"`     | The node discriminator.                                                                                                                                                                    |
| `identifier` | `IdentifierString`                       | The identifier of the account-list input exposed to callers.                                                                                                                               |
| `isOptional` | `boolean` _(optional)_                   | Whether the remaining-accounts tail may be empty. Defaults to `false`.                                                                                                                     |
| `isSigner`   | `true \| false \| "either"` _(optional)_ | Whether each remaining account must sign the transaction. The literal `"either"` indicates that each account may or may not be a signer, independently of the others. Defaults to `false`. |
| `isWritable` | `boolean` _(optional)_                   | Whether the instruction may write to each remaining account.                                                                                                                               |

### Children

| Attribute | Type                                                                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `docs`    | `string` \| [`TextNode`](./TextNode.md) _(optional)_                                            | Markdown documentation for the remaining-accounts slot.                                                                               |
| `display` | [`InstructionAccountDisplayNode`](./displayNodes/InstructionAccountDisplayNode.md) _(optional)_ | Display metadata describing how the remaining-accounts group is presented as a whole.                                                 |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_                                                  | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Optional remaining signers

```typescript
instructionRemainingAccountsNode('authorities', {
    isSigner: true,
    isOptional: true,
});
```

### Remaining accounts that may or may not be signers

```typescript
instructionRemainingAccountsNode('authorities', {
    isSigner: 'either',
});
```

### Remaining accounts auto-filled by a renderer plugin

```typescript
// The identifier honestly declares a client input; renderers with a matching
// plugin may fill it automatically, others expose it as a plain input.
instructionRemainingAccountsNode('authorities', {
    isSigner: true,
    docs: ['Provide authorities as remaining accounts if and only if the asset has a multisig set up.'],
    plugins: [
        pluginNode('codama.jsResolver', {
            payload: { function: 'resolveTransferRemainingAccounts', dependsOn: ['data.hasMultisig'] },
        }),
    ],
});
```
