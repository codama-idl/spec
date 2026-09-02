# AccountBumpValueNode

Refers to the bump seed of a named PDA-derived account in the surrounding instruction.

## Attributes

### Data

| Attribute    | Type                     | Description                                                  |
| ------------ | ------------------------ | ------------------------------------------------------------ |
| `kind`       | `"accountBumpValueNode"` | The node discriminator.                                      |
| `identifier` | `IdentifierString`       | The identifier of the account whose bump seed is referenced. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an account bump value node from an account name

```typescript
const node = accountBumpValueNode('associatedTokenAccount');
```

### An instruction argument defaulting to the bump derivation of an instruction account

```typescript
instructionNode({
    identifier: 'transfer',
    accounts: [
        instructionAccountNode({
            identifier: 'associatedTokenAccount',
            isSigner: false,
            isWritable: true,
        }),
        // ...
    ],
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'bump',
            type: numberTypeNode('u8'),
            defaultValue: injectedValueNode({ key: 'bump' }),
        }),
        // ...
    ]),
    provides: [providedNode('bump', accountBumpValueNode('associatedTokenAccount'))],
});
```
