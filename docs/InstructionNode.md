# InstructionNode

A program instruction: its accounts, data, byte-delta hints, discriminators, optional status, and optional sub-instructions.

![Diagram](https://github.com/codama-idl/codama/assets/3642397/0d8edced-cfa4-4500-b80c-ebc56181a338)

## Attributes

### Data

| Attribute    | Type                | Description                        |
| ------------ | ------------------- | ---------------------------------- |
| `kind`       | `"instructionNode"` | The node discriminator.            |
| `identifier` | `IdentifierString`  | The identifier of the instruction. |

### Children

| Attribute                 | Type                                                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs`                    | `string` \| [`TextNode`](./TextNode.md) _(optional)_                                       | Markdown documentation for the instruction.                                                                                                                                                                                                                                                                                                                                                 |
| `optionalAccountStrategy` | [`OptionalAccountStrategy`](./sharedNodes/OptionalAccountStrategy.md) _(optional)_         | How absent optional accounts are represented when serialising the instruction. When absent, `programId` is assumed.                                                                                                                                                                                                                                                                         |
| `accounts`                | [`InstructionAccountNode`](./InstructionAccountNode.md)[]                                  | The accounts the instruction operates on, in order.                                                                                                                                                                                                                                                                                                                                         |
| `data`                    | [`TypeNode`](./typeNodes/TypeNode.md) _(optional)_                                         | The type describing the serialised instruction data — any type node, including a `definedTypeLinkNode`. Typically a struct whose fields are the instruction arguments. When absent, the instruction serialises no data. Contextual defaults use the inject/provide pattern: a field default may be an `injectedValueNode` whose key is fulfilled by the `provides` list of the instruction. |
| `remainingAccounts`       | [`InstructionRemainingAccountsNode`](./InstructionRemainingAccountsNode.md)[] _(optional)_ | Variable-length tails of accounts appended after the named account slots.                                                                                                                                                                                                                                                                                                                   |
| `byteDeltas`              | [`InstructionByteDeltaNode`](./InstructionByteDeltaNode.md)[] _(optional)_                 | Byte-size adjustments applied when computing rent or buffer size — for instructions that resize accounts. All deltas are added together, unless their `subtract` attribute is set.                                                                                                                                                                                                          |
| `discriminators`          | [`DiscriminatorNode`](./discriminatorNodes/DiscriminatorNode.md)[] _(optional)_            | Discriminators that distinguish this instruction from others. When multiple are listed, they are combined with a logical AND.                                                                                                                                                                                                                                                               |
| `status`                  | [`InstructionStatusNode`](./InstructionStatusNode.md) _(optional)_                         | The lifecycle status of the instruction.                                                                                                                                                                                                                                                                                                                                                    |
| `subInstructions`         | [`InstructionNode`](./InstructionNode.md)[] _(optional)_                                   | Nested instructions that split this instruction into distinct scenarios — e.g. one sub-instruction per version of the instruction.                                                                                                                                                                                                                                                          |
| `provides`                | [`ProvidedNode`](./ProvidedNode.md)[] _(optional)_                                         | Named nodes exposed to consumers in the surrounding scope. Each entry pairs with an `injectedValueNode` that references it by key, so reusable types can pull contextual values without naming siblings directly. IDLs must be self-contained: every injection key in scope must resolve to a provided entry or carry a fallback.                                                           |
| `display`                 | [`InstructionDisplayNode`](./displayNodes/InstructionDisplayNode.md) _(optional)_          | Display metadata describing how the instruction is presented.                                                                                                                                                                                                                                                                                                                               |
| `plugins`                 | [`PluginNode`](./PluginNode.md)[] _(optional)_                                             | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                                                                                                                                                                                                                                       |

## Examples

### An instruction with a u8 discriminator

```typescript
instructionNode({
    identifier: 'increment',
    accounts: [
        instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: true }),
        instructionAccountNode({ identifier: 'authority', isWritable: false, isSigner: false }),
    ],
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'discriminator',
            type: integerTypeNode('u8'),
            defaultValue: integerValueNode('42'),
            defaultValueStrategy: 'omitted',
        }),
    ]),
});
```

### An instruction providing a contextual default

```typescript
instructionNode({
    identifier: 'createAccount',
    accounts: [
        instructionAccountNode({ identifier: 'payer', isWritable: true, isSigner: true }),
        instructionAccountNode({ identifier: 'newAccount', isWritable: true, isSigner: true }),
    ],
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'bump',
            type: integerTypeNode('u8'),
            defaultValue: injectedValueNode({ key: 'bump' }),
        }),
    ]),
    provides: [providedNode('bump', accountBumpValueNode('newAccount'))],
});
```

### An instruction that creates a new account

```typescript
instructionNode({
    identifier: 'createCounter',
    accounts: [
        instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: true }),
        instructionAccountNode({ identifier: 'authority', isWritable: false, isSigner: false }),
    ],
    byteDeltas: [instructionByteDeltaNode(accountLinkNode('counter'))],
});
```

### An instruction with omitted optional accounts

```typescript
instructionNode({
    identifier: 'initialize',
    accounts: [
        instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: true }),
        instructionAccountNode({ identifier: 'authority', isWritable: false, isSigner: false }),
        instructionAccountNode({ identifier: 'freezeAuthority', isWritable: false, isSigner: false, isOptional: true }),
    ],
    optionalAccountStrategy: 'omitted',
});
```

### An instruction with remaining signers

```typescript
instructionNode({
    identifier: 'multisigIncrement',
    accounts: [instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: false })],
    remainingAccounts: [instructionRemainingAccountsNode('authorities', { isSigner: true })],
});
```

### An instruction with nested versioned instructions

```typescript
instructionNode({
    identifier: 'increment',
    accounts: [
        instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: 'either' }),
        instructionAccountNode({ identifier: 'authority', isWritable: false, isSigner: true }),
    ],
    data: structTypeNode([
        structFieldTypeNode({ identifier: 'version', type: integerTypeNode('u8') }),
        structFieldTypeNode({ identifier: 'amount', type: integerTypeNode('u8') }),
    ]),
    subInstructions: [
        instructionNode({
            identifier: 'incrementV1',
            accounts: [instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: true })],
            data: structTypeNode([
                structFieldTypeNode({
                    identifier: 'version',
                    type: integerTypeNode('u8'),
                    defaultValue: integerValueNode('0'),
                    defaultValueStrategy: 'omitted',
                }),
                structFieldTypeNode({ identifier: 'amount', type: integerTypeNode('u8') }),
            ]),
        }),
        instructionNode({
            identifier: 'incrementV2',
            accounts: [
                instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: false }),
                instructionAccountNode({ identifier: 'authority', isWritable: false, isSigner: true }),
            ],
            data: structTypeNode([
                structFieldTypeNode({
                    identifier: 'version',
                    type: integerTypeNode('u8'),
                    defaultValue: integerValueNode('1'),
                    defaultValueStrategy: 'omitted',
                }),
                structFieldTypeNode({ identifier: 'amount', type: integerTypeNode('u8') }),
            ]),
        }),
    ],
});
```

### A deprecated instruction

```typescript
instructionNode({
    identifier: 'oldIncrement',
    status: instructionStatusNode(
        'deprecated',
        'Use the `increment` instruction instead. This will be removed in v3.0.0.',
    ),
    accounts: [instructionAccountNode({ identifier: 'counter', isWritable: true, isSigner: false })],
    data: structTypeNode([structFieldTypeNode({ identifier: 'amount', type: integerTypeNode('u8') })]),
});
```

### An archived instruction

```typescript
instructionNode({
    identifier: 'legacyTransfer',
    status: instructionStatusNode(
        'archived',
        'This instruction was removed in v2.0.0. It is kept here for historical parsing.',
    ),
    accounts: [
        instructionAccountNode({ identifier: 'source', isWritable: true, isSigner: true }),
        instructionAccountNode({ identifier: 'destination', isWritable: true, isSigner: false }),
    ],
    data: structTypeNode([structFieldTypeNode({ identifier: 'amount', type: integerTypeNode('u64') })]),
});
```

### A draft instruction

```typescript
instructionNode({
    identifier: 'experimentalFeature',
    status: instructionStatusNode('draft', 'This instruction is under development and may change.'),
    accounts: [instructionAccountNode({ identifier: 'config', isWritable: true, isSigner: true })],
});
```
