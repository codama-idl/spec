# AccountNode

An on-chain account: its name, data structure, optional fixed size, optional PDA, and optional discriminators.

![Diagram](https://github.com/codama-idl/codama/assets/3642397/77974dad-212e-49b1-8e41-5d466c273a02)

## Attributes

### Data

| Attribute | Type                    | Description                                                      |
| --------- | ----------------------- | ---------------------------------------------------------------- |
| `kind`    | `"accountNode"`         | The node discriminator.                                          |
| `name`    | `CamelCaseString`       | The name of the account.                                         |
| `size`    | `u64` _(optional)_      | The size of the account in bytes, when the data length is fixed. |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the account.                          |

### Children

| Attribute        | Type                                                                            | Description                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `data`           | [`StructTypeNode`](./typeNodes/StructTypeNode.md)                               | The struct describing the account data. It must be a struct so its fields can be referenced by other nodes — e.g. `accountFieldValueNode`. |
| `pda`            | [`PdaLinkNode`](./linkNodes/PdaLinkNode.md) _(optional)_                        | A link to the PDA the account is derived from, if applicable.                                                                              |
| `discriminators` | [`DiscriminatorNode`](./discriminatorNodes/DiscriminatorNode.md)[] _(optional)_ | Discriminators that distinguish this account from others in the program. When multiple are listed, they are combined with a logical AND.   |
| `plugins`        | [`PluginNode`](./PluginNode.md)[] _(optional)_                                  | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.      |

## Examples

### A fixed-size account

```typescript
const node = accountNode({
    name: 'token',
    data: structTypeNode([
        structFieldTypeNode({ name: 'mint', type: publicKeyTypeNode() }),
        structFieldTypeNode({ name: 'owner', type: publicKeyTypeNode() }),
        structFieldTypeNode({ name: 'amount', type: numberTypeNode('u64') }),
    ]),
    discriminators: [sizeDiscriminatorNode(72)],
    size: 72,
});
```

### An account with a linked PDA

```typescript
programNode({
    name: 'myProgram',
    accounts: [
        accountNode({
            name: 'token',
            data: structTypeNode([structFieldTypeNode({ name: 'authority', type: publicKeyTypeNode() })]),
            pda: pdaLinkNode('myPda'),
        }),
    ],
    pdas: [
        pdaNode({
            name: 'myPda',
            seeds: [
                constantPdaSeedNodeFromString('utf8', 'token'),
                variablePdaSeedNode('authority', publicKeyTypeNode()),
            ],
        }),
    ],
});
```
