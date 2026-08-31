# PayerValueNode

Refers to the wallet paying for the surrounding transaction — the main wallet that should pay for things, such as rent for account storage.
For instance, in a web application the payer would be the connected wallet; in a terminal, the wallet identified by `solana address`.
A similar node exists for the main wallet that should own things — `identityValueNode`. In practice the identity and the payer are often the same, but offering the distinction can be useful should they differ.

## Attributes

### Data

| Attribute | Type               | Description             |
| --------- | ------------------ | ----------------------- |
| `kind`    | `"payerValueNode"` | The node discriminator. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a payer value node

```typescript
const node = payerValueNode();
```

### An instruction account defaulting to the payer value

```typescript
instructionNode({
    name: 'transfer',
    accounts: [
        instructionAccountNode({
            name: 'payer',
            isSigner: true,
            isWritable: false,
            defaultValue: payerValueNode(),
        }),
        // ...
    ],
});
```
