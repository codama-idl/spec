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

### A live instruction (no status needed)

```typescript
instructionNode({
    name: 'transfer',
    accounts: [...],
    arguments: [...],
});
```

### A deprecated instruction

```typescript
instructionNode({
    name: 'oldTransfer',
    status: instructionStatusNode('deprecated', 'Use the `transfer` instruction instead. This will be removed in v3.0.0.'),
    accounts: [...],
    arguments: [...],
});
```

### An archived instruction

```typescript
instructionNode({
    name: 'legacyTransfer',
    status: instructionStatusNode('archived', 'This instruction was removed in v2.0.0. It is kept here for historical parsing.'),
    accounts: [...],
    arguments: [...],
});
```

### A draft instruction

```typescript
instructionNode({
    name: 'experimentalFeature',
    status: instructionStatusNode('draft', 'This instruction is under development and may change.'),
    accounts: [...],
    arguments: [...],
});
```

### Status without a message

```typescript
instructionNode({
    name: 'someInstruction',
    status: instructionStatusNode('deprecated'),
    accounts: [...],
    arguments: [...],
});
```
