# IdentityValueNode

Refers to the wallet identity providing the instruction context — the main wallet that should own things.
For instance, in a web application the identity would be the connected wallet; in a terminal, the wallet identified by `solana address`.
A similar node exists for the main wallet that should pay for things — `payerValueNode`. In practice the identity and the payer are often the same, but offering the distinction can be useful should they differ.

## Attributes

### Data

| Attribute | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| `kind`    | `"identityValueNode"` | The node discriminator. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an identity value node

```typescript
const node = identityValueNode();
```

### An instruction account defaulting to the identity value

```typescript
instructionNode({
    identifier: 'transfer',
    accounts: [
        instructionAccountNode({
            identifier: 'authority',
            isSigner: true,
            isWritable: false,
            defaultValue: identityValueNode(),
        }),
        // ...
    ],
});
```
