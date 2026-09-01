# AccountNode

An on-chain account: its name, data structure, optional fixed size, optional PDA, and optional discriminators.

![Diagram](https://github.com/codama-idl/codama/assets/3642397/77974dad-212e-49b1-8e41-5d466c273a02)

## Attributes

### Data

| Attribute    | Type                    | Description                                                      |
| ------------ | ----------------------- | ---------------------------------------------------------------- |
| `kind`       | `"accountNode"`         | The node discriminator.                                          |
| `identifier` | `IdentifierString`      | The identifier of the account.                                   |
| `size`       | `u64` _(optional)_      | The size of the account in bytes, when the data length is fixed. |
| `docs`       | `string[]` _(optional)_ | Markdown documentation for the account.                          |

### Children

| Attribute        | Type                                                                            | Description                                                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`           | [`TypeNode`](./typeNodes/TypeNode.md)                                           | The type describing the account data — any type node, including a `definedTypeLinkNode` to share or reuse a defined type. Nodes that reference account fields by name — e.g. `accountFieldValueNode` or `fieldDiscriminatorNode` — are only valid when this type resolves to a struct (following links). |
| `pda`            | [`PdaLinkNode`](./linkNodes/PdaLinkNode.md) _(optional)_                        | A link to the PDA the account is derived from, if applicable.                                                                                                                                                                                                                                            |
| `discriminators` | [`DiscriminatorNode`](./discriminatorNodes/DiscriminatorNode.md)[] _(optional)_ | Discriminators that distinguish this account from others in the program. When multiple are listed, they are combined with a logical AND.                                                                                                                                                                 |
| `plugins`        | [`PluginNode`](./PluginNode.md)[] _(optional)_                                  | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                                                                                                                                                    |

## Examples

### A fixed-size account

```typescript
const node = accountNode({
    identifier: 'token',
    data: structTypeNode([
        structFieldTypeNode({ identifier: 'mint', type: publicKeyTypeNode() }),
        structFieldTypeNode({ identifier: 'owner', type: publicKeyTypeNode() }),
        structFieldTypeNode({ identifier: 'amount', type: numberTypeNode('u64') }),
    ]),
    discriminators: [sizeDiscriminatorNode(72)],
    size: 72,
});
```

### An account reusing a defined type as its data

```typescript
programNode({
    identifier: 'myProgram',
    accounts: [accountNode({ identifier: 'mint', data: definedTypeLinkNode('mintState') })],
    definedTypes: [
        definedTypeNode({
            identifier: 'mintState',
            type: structTypeNode([structFieldTypeNode({ identifier: 'supply', type: numberTypeNode('u64') })]),
        }),
    ],
});
```

### An account with a linked PDA

```typescript
programNode({
    identifier: 'myProgram',
    accounts: [
        accountNode({
            identifier: 'token',
            data: structTypeNode([structFieldTypeNode({ identifier: 'authority', type: publicKeyTypeNode() })]),
            pda: pdaLinkNode('myPda'),
        }),
    ],
    pdas: [
        pdaNode({
            identifier: 'myPda',
            seeds: [
                constantPdaSeedNodeFromString('utf8', 'token'),
                variablePdaSeedNode('authority', publicKeyTypeNode()),
            ],
        }),
    ],
});
```
