# AccountFieldValueNode

Refers to a field of a named account's decoded data.
The referenced account must carry an `accountLink` so the account's layout is known.
Resolving the value requires reading the account state at presentation time.

## Attributes

### Data

| Attribute | Type                            | Description                                                                                                                                                                                        |
| --------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`    | `"accountFieldValueNode"`       | The node discriminator.                                                                                                                                                                            |
| `account` | `IdentifierString`              | The name of the referenced account in the surrounding instruction.                                                                                                                                 |
| `path`    | `IdentifierString` _(optional)_ | The name of the field within the account's decoded data. Only valid when the account's data type resolves to a struct (following links). When absent, the value is the whole decoded account data. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an account field value node from an account name and a field path

```typescript
const node = accountFieldValueNode('mint', 'decimals');
```

### An argument defaulting to a field of an instruction account

```typescript
instructionNode({
    identifier: 'transferChecked',
    accounts: [
        instructionAccountNode({
            identifier: 'mint',
            isWritable: false,
            isSigner: false,
            accountLink: accountLinkNode('mint'),
        }),
        // ...
    ],
    arguments: [
        instructionArgumentNode({
            identifier: 'decimals',
            type: numberTypeNode('u8'),
            defaultValue: accountFieldValueNode('mint', 'decimals'),
        }),
        // ...
    ],
});
```
