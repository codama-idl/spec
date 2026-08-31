# InstructionRemainingAccountsNode

A "remaining accounts" slot in an instruction — a variable-length tail of accounts derived from a value.

## Attributes

### Data

| Attribute    | Type                                     | Description                                                                                                                                                                                |
| ------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `kind`       | `"instructionRemainingAccountsNode"`     | The node discriminator.                                                                                                                                                                    |
| `isOptional` | `boolean` _(optional)_                   | Whether the remaining-accounts tail may be empty. Defaults to `false`.                                                                                                                     |
| `isSigner`   | `true \| false \| "either"` _(optional)_ | Whether each remaining account must sign the transaction. The literal `"either"` indicates that each account may or may not be a signer, independently of the others. Defaults to `false`. |
| `isWritable` | `boolean` _(optional)_                   | Whether the instruction may write to each remaining account.                                                                                                                               |
| `docs`       | `string[]` _(optional)_                  | Markdown documentation for the remaining-accounts slot.                                                                                                                                    |

### Children

| Attribute | Type                                                                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `value`   | [`InstructionRemainingAccountsValue`](./InstructionRemainingAccountsValue.md)                   | The source of the remaining-accounts list — a referenced argument or a resolver.                                                      |
| `display` | [`InstructionAccountDisplayNode`](./displayNodes/InstructionAccountDisplayNode.md) _(optional)_ | Display metadata describing how the remaining-accounts group is presented as a whole.                                                 |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_                                                  | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Optional remaining signers

```typescript
instructionRemainingAccountsNode(argumentValueNode('authorities'), {
    isSigner: true,
    isOptional: true,
});
```

### Remaining accounts that may or may not be signers

```typescript
instructionRemainingAccountsNode(argumentValueNode('authorities'), {
    isSigner: 'either',
});
```

### Remaining accounts using a resolver

```typescript
instructionRemainingAccountsNode(
    resolverValueNode('resolveTransferRemainingAccounts', {
        docs: ['Provide authorities as remaining accounts if and only if the asset has a multisig set up.'],
        dependsOn: [argumentValueNode('hasMultisig'), argumentValueNode('authorities')],
    }),
);
```
