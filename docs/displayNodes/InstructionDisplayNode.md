# InstructionDisplayNode

Display metadata for an instruction: a short intent label and an interpolated sentence template.
Either form may be absent; presentation strategy is left to the renderer.

## Attributes

### Data

| Attribute | Type                       | Description             |
| --------- | -------------------------- | ----------------------- |
| `kind`    | `"instructionDisplayNode"` | The node discriminator. |

### Children

| Attribute            | Type                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intent`             | `string` \| [`TextNode`](../TextNode.md) _(optional)_ | A short imperative label describing what the instruction does (e.g. `"Transfer"`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `interpolatedIntent` | `string` \| [`TextNode`](../TextNode.md) _(optional)_ | A sentence template that composes the instruction into prose with `${root…}` placeholders. Roots are `data` (the instruction data) and `accounts` (the instruction accounts). After the `data` root, placeholders embed the shared path-expression grammar (e.g. `${data.amount}`, `${data.config.fees[0]}`, `${data[0]}`), which may cross a public key's `accountLink` into the linked account's data (e.g. `${data.mint.decimals}`). After the `accounts` root, an account identifier follows and renders as its address (e.g. `${accounts.destination}`), optionally followed by `.data` and a path into the account's decoded data (e.g. `${accounts.mint.data.decimals}`), resolved as `accountDataValueNode` does and requiring the account's `accountLink`. The `.data` segment is explicit because an account has attributes beyond its data: other segments after an account identifier are reserved for them, e.g. its lamports, and are invalid until then. A placeholder renders through its referent's own presentation, including the value labels of a struct field; the `skip` rule governs the fallback list only and never the sentence. |
| `plugins`            | [`PluginNode`](../PluginNode.md)[] _(optional)_       | Namespaced plugins with custom structured data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

## Examples

### An intent label plus an interpolated sentence

```typescript
instructionNode({
    identifier: 'transferChecked',
    display: instructionDisplayNode({
        intent: 'Transfer',
        interpolatedIntent: 'Transfer ${data.amount} to ${accounts.destination}',
    }),
    // ...accounts and data
});

// intent      => "Transfer"
// interpolated => "Transfer 1.5 USDC to 3Wnd5…5PxJX"
```

### An intent label only, letting the renderer build the fallback list

```typescript
instructionNode({
    identifier: 'closeAccount',
    display: instructionDisplayNode({ intent: 'Close Account' }),
    // ...accounts and data
});
```

### A sentence reading the data of an account

```typescript
instructionNode({
    identifier: 'transfer',
    accounts: [
        instructionAccountNode({
            identifier: 'destination',
            isSigner: false,
            isWritable: true,
            accountLink: accountLinkNode('token'),
        }),
        // ...
    ],
    display: instructionDisplayNode({
        intent: 'Transfer',
        interpolatedIntent: 'Transfer ${data.amount} to ${accounts.destination.data.owner}',
    }),
    // ...data
});

// interpolated => "Transfer 1.5 USDC to 9BbW…ftkT", the owner of the destination token account
```
