# AccountNode

An on-chain account: its name, data structure, optional fixed size, optional PDA, and optional discriminators.

## Attributes

### Data

| Attribute | Type                    | Description                                                      |
| --------- | ----------------------- | ---------------------------------------------------------------- |
| `kind`    | `"accountNode"`         | The node discriminator.                                          |
| `name`    | `CamelCaseString`       | The name of the account.                                         |
| `size`    | `u64` _(optional)_      | The size of the account in bytes, when the data length is fixed. |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the account.                          |

### Children

| Attribute        | Type                                                                                                 | Description                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `data`           | [`NestedTypeNode`](./typeNodes/NestedTypeNode.md)<[`StructTypeNode`](./typeNodes/StructTypeNode.md)> | The struct describing the account data.                                  |
| `pda`            | [`PdaLinkNode`](./linkNodes/PdaLinkNode.md) _(optional)_                                             | A link to the PDA the account is derived from, if applicable.            |
| `discriminators` | [`DiscriminatorNode`](./discriminatorNodes/DiscriminatorNode.md)[] _(optional)_                      | Discriminators that distinguish this account from others in the program. |

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
