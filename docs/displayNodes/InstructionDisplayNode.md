# InstructionDisplayNode

Display metadata for an instruction: a short intent label and an interpolated sentence template.
Either form may be absent; presentation strategy is left to the renderer.

## Attributes

### Data

| Attribute            | Type                       | Description                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`               | `"instructionDisplayNode"` | The node discriminator.                                                                                                                                                                                                                                                                                                                                                                                        |
| `intent`             | `string` _(optional)_      | A short imperative label describing what the instruction does (e.g. `"Transfer"`).                                                                                                                                                                                                                                                                                                                             |
| `interpolatedIntent` | `string` _(optional)_      | A sentence template that composes the instruction into prose with `${root.path}` placeholders. Roots are `data.` (an instruction argument) and `accounts.` (an instruction account); the path is flat after the root (e.g. `${data.amount}`, `${accounts.destination}`). A placeholder renders through its referent's own presentation; the `skip` rule governs the fallback list only and never the sentence. |

## Examples

### An intent label plus an interpolated sentence

```typescript
instructionNode({
    name: 'transferChecked',
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
    name: 'closeAccount',
    display: instructionDisplayNode({ intent: 'Close Account' }),
    // ...accounts and arguments
});
```
