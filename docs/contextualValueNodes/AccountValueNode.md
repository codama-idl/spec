# AccountValueNode

Refers to a named account in the surrounding instruction.

## Attributes

### Data

| Attribute    | Type                 | Description                               |
| ------------ | -------------------- | ----------------------------------------- |
| `kind`       | `"accountValueNode"` | The node discriminator.                   |
| `identifier` | `IdentifierString`   | The identifier of the referenced account. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an account value node from an account name

```typescript
const node = accountValueNode('mint');
```

### An instruction account defaulting to another account

```typescript
instructionNode({
    identifier: 'mint',
    accounts: [
        instructionAccountNode({
            identifier: 'payer',
            isSigner: true,
            isWritable: false,
        }),
        instructionAccountNode({
            identifier: 'authority',
            isSigner: false,
            isWritable: true,
            defaultValue: accountValueNode('payer'),
        }),
        // ...
    ],
});
```
