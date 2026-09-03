# InstructionAccountDisplayNode

Display metadata for an instruction account: its label in the fallback list and whether it is shown.

## Attributes

### Data

| Attribute | Type                              | Description             |
| --------- | --------------------------------- | ----------------------- |
| `kind`    | `"instructionAccountDisplayNode"` | The node discriminator. |

### Children

| Attribute | Type                                                        | Description                                                                                                                           |
| --------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `label`   | `string` \| [`TextNode`](../TextNode.md) _(optional)_       | An override label shown in the fallback list (e.g. `"To"`). When absent, renderers derive a label from the account `name`.            |
| `skip`    | [`DisplaySkip`](../sharedNodes/DisplaySkip.md) _(optional)_ | Whether the account is shown in the fallback list. Defaults to `"never"` (always shown).                                              |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_             | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Relabelling an account in the fallback list

```typescript
instructionAccountNode({
    identifier: 'destination',
    isSigner: false,
    isWritable: true,
    display: instructionAccountDisplayNode({ label: 'To' }),
});
```

### Hiding an account once its value is surfaced elsewhere

```typescript
instructionAccountNode({
    identifier: 'mint',
    isSigner: false,
    isWritable: false,
    display: instructionAccountDisplayNode({ label: 'Token Mint', skip: 'whenInjected' }),
});
```
