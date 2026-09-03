# InstructionStatusNode

The lifecycle stage of an instruction (draft, live, deprecated, archived) with an optional accompanying message.
An instruction without a status is considered live — a status node is typically only attached to signal another stage.

## Attributes

### Data

| Attribute | Type                      | Description             |
| --------- | ------------------------- | ----------------------- |
| `kind`    | `"instructionStatusNode"` | The node discriminator. |

### Children

| Attribute   | Type                                                            | Description                                                                                                                           |
| ----------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `lifecycle` | [`InstructionLifecycle`](./sharedNodes/InstructionLifecycle.md) | The lifecycle stage.                                                                                                                  |
| `message`   | `string` \| [`TextNode`](./TextNode.md) _(optional)_            | Free-form prose accompanying the status — e.g. a deprecation notice with migration guidance.                                          |
| `plugins`   | [`PluginNode`](./PluginNode.md)[] _(optional)_                  | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A deprecated status with migration guidance

```typescript
instructionStatusNode('deprecated', 'Use the `transfer` instruction instead. This will be removed in v3.0.0.');
```

### A status without a message

```typescript
instructionStatusNode('archived');
```

### Attaching a status to an instruction

```typescript
instructionNode({
    identifier: 'experimentalFeature',
    status: instructionStatusNode('draft', 'This instruction is under development and may change.'),
    // ...
});
```
