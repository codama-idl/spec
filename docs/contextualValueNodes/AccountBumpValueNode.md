# AccountBumpValueNode

Refers to the bump seed of a named PDA-derived account in the surrounding instruction.

## Attributes

### Data

| Attribute | Type                     | Description                                            |
| --------- | ------------------------ | ------------------------------------------------------ |
| `kind`    | `"accountBumpValueNode"` | The node discriminator.                                |
| `name`    | `CamelCaseString`        | The name of the account whose bump seed is referenced. |

## Examples

### Create an account bump value node from an account name

```typescript
const node = accountBumpValueNode('associatedTokenAccount');
```

### An instruction argument defaulting to the bump derivation of an instruction account

```typescript
instructionNode({
    name: 'transfer',
    accounts: [
        instructionAccountNode({
            name: 'associatedTokenAccount',
            isSigner: false,
            isWritable: true,
        }),
        // ...
    ],
    arguments: [
        instructionArgumentNode({
            name: 'bump',
            type: numberTypeNode('u8'),
            defaultValue: accountBumpValueNode('associatedTokenAccount'),
        }),
        // ...
    ],
});
```
