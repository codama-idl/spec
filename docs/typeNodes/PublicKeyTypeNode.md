# PublicKeyTypeNode

A 32-byte Solana public key.

## Attributes

### Data

| Attribute | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| `kind`    | `"publicKeyTypeNode"` | The node discriminator. |

### Children

| Attribute     | Type                                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accountLink` | [`AccountLinkNode`](../linkNodes/AccountLinkNode.md) _(optional)_    | A reference to the data layout of the account this address points to. Path expressions cross this public key with a `.data` segment, which continues into the linked account's decoded data, as `.data` does after an account identifier in interpolated intents — e.g. `mint.data.decimals` reads the `decimals` of the mint whose address is in the `mint` field, and `mint.data` its whole data. Other segments after the public key are reserved for other attributes of the account, e.g. its lamports, and are invalid until then. Resolving such paths requires reading the account state at presentation time; when the account is missing or its data cannot be decoded with the linked layout, the path is unresolved and its consumer falls back as usual. The link's optional `program` allows cross-program references via the root's `additionalPrograms`. |
| `transforms`  | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_ | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `plugins`     | [`PluginNode`](../PluginNode.md)[] _(optional)_                      | Namespaced plugins with custom structured data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

## Examples

### Create a public key type node

```typescript
const node = publicKeyTypeNode();
```

### A public key linked to the account it points to

```typescript
// A token account stores the address of its mint.
accountNode({
    identifier: 'token',
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'mint',
            type: publicKeyTypeNode({ accountLink: accountLinkNode('mint') }),
        }),
        // ...
    ]),
});

// An instruction account linked to a token account...
instructionAccountNode({
    identifier: 'inputTokenAccount',
    isSigner: false,
    isWritable: true,
    accountLink: accountLinkNode('token'),
});

// ...lets paths follow its mint address into the mint's data, through a data segment.
providedNode('decimals', accountDataValueNode('inputTokenAccount', 'mint.data.decimals'));
```
