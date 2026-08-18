# AccountFieldValueNode

Refers to a field of a named account's decoded data.
The referenced account must carry an `accountLink` so the account's layout is known.
Resolving the value requires reading the account state at presentation time.

## Attributes

### Data

| Attribute | Type                           | Description                                                        |
| --------- | ------------------------------ | ------------------------------------------------------------------ |
| `kind`    | `"accountFieldValueNode"`      | The node discriminator.                                            |
| `account` | `CamelCaseString`              | The name of the referenced account in the surrounding instruction. |
| `path`    | `CamelCaseString` _(optional)_ | The name of the field within the account's decoded data.           |

## Examples

### Create an account field value node from an account name and a field path

```typescript
const node = accountFieldValueNode('mint', 'decimals');
```

### An argument defaulting to a field of an instruction account

```typescript
instructionNode({
    name: 'transferChecked',
    accounts: [
        instructionAccountNode({
            name: 'mint',
            isWritable: false,
            isSigner: false,
            accountLink: accountLinkNode('mint'),
        }),
        // ...
    ],
    arguments: [
        instructionArgumentNode({
            name: 'decimals',
            type: numberTypeNode('u8'),
            defaultValue: accountFieldValueNode('mint', 'decimals'),
        }),
        // ...
    ],
});
```
