# InstructionDisplayNode

Display metadata for an instruction: a short intent label and an interpolated sentence template.
Either form may be absent; presentation strategy is left to the renderer.

## Attributes

### Data

| Attribute            | Type                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`               | `"instructionDisplayNode"` | The node discriminator.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `intent`             | `string` _(optional)_      | A short imperative label describing what the instruction does (e.g. `"Transfer"`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `interpolatedIntent` | `string` _(optional)_      | A sentence template that composes the instruction into prose with `${root…}` placeholders. Roots are `data` (the instruction data) and `accounts` (the instruction accounts). After the `data` root, placeholders embed the shared path-expression grammar (e.g. `${data.amount}`, `${data.config.fees[0]}`, `${data[0]}`); after the `accounts` root, exactly one account identifier follows (e.g. `${accounts.destination}`) — accounts resolve to addresses, so nothing nests. A placeholder renders through its referent's own presentation; the `skip` rule governs the fallback list only and never the sentence. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### An intent label plus an interpolated sentence

```typescript
instructionNode({
    identifier: 'transferChecked',
    display: instructionDisplayNode({
        intent: 'Transfer',
        interpolatedIntent: 'Transfer ${data.amount} to ${accounts.destination}',
    }),
    // ...accounts and arguments
});

// intent      => "Transfer"
// interpolated => "Transfer 1.5 USDC to 3Wnd5…5PxJX"
```

### An intent label only, letting the renderer build the fallback list

```typescript
instructionNode({
    identifier: 'closeAccount',
    display: instructionDisplayNode({ intent: 'Close Account' }),
    // ...accounts and arguments
});
```
