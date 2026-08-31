# PdaValueNode

Resolves to a PDA derived from a list of seed values.

## Attributes

### Data

| Attribute | Type             | Description             |
| --------- | ---------------- | ----------------------- |
| `kind`    | `"pdaValueNode"` | The node discriminator. |

### Children

| Attribute   | Type                                                       | Description                                                                                                                           |
| ----------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `pda`       | [`PdaValuePda`](./PdaValuePda.md)                          | The PDA being derived — either a link to a defined PDA or an inline `pdaNode`.                                                        |
| `seeds`     | [`PdaSeedValueNode`](./PdaSeedValueNode.md)[]              | The seed values used to derive the PDA, paired with their seed names.                                                                 |
| `programId` | [`PdaValueProgramId`](./PdaValueProgramId.md) _(optional)_ | The program ID used to derive the PDA. When omitted, the PDA’s declared program is used.                                              |
| `plugins`   | [`PluginNode`](../PluginNode.md)[] _(optional)_            | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a PDA value node from a PDA definition and seed values

```typescript
const node = pdaValueNode('associatedToken', [
    pdaSeedValueNode('mint', publicKeyValueNode('G345gmp34svbGxyXuCvKVVHDbqJQ66y65vVrx7m7FmBE')),
    pdaSeedValueNode('owner', publicKeyValueNode('Nzgr9bYfMRq5768bHfXsXoPTnLWAXgQNosRBxK63jRH')),
]);
```

### A PDA value whose seeds point to other accounts

```typescript
pdaValueNode('associatedToken', [
    pdaSeedValueNode('mint', accountValueNode('mint')),
    pdaSeedValueNode('owner', accountValueNode('authority')),
]);
```

### A PDA value with an inlined PDA definition

```typescript
const inlinedPdaNode = pdaNode({
    name: 'associatedToken',
    seeds: [
        variablePdaSeedNode('mint', publicKeyTypeNode()),
        constantPdaSeedNode(publicKeyTypeNode(), publicKeyValueNode('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')),
        variablePdaSeedNode('owner', publicKeyTypeNode()),
    ],
});

pdaValueNode(inlinedPdaNode, [
    pdaSeedValueNode('mint', accountValueNode('mint')),
    pdaSeedValueNode('owner', accountValueNode('authority')),
]);
```
