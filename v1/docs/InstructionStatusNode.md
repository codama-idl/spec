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
    name: 'experimentalFeature',
    status: instructionStatusNode('draft', 'This instruction is under development and may change.'),
    // ...
});
```
