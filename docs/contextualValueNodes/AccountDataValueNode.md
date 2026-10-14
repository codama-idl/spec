# AccountDataValueNode

Refers to a value within a named account's decoded data.
The referenced account must carry an `accountLink` so the account's layout is known.
Resolving the value requires reading the account state. When presenting, an unresolvable value falls back as usual. When building an instruction, e.g. for a PDA seed or a default value, there is nothing to fall back to: consumers that cannot or do not read the account must fail explicitly rather than guess.

## Attributes

### Data

| Attribute | Type                      | Description                                                                                                                                                                                                                                                                                                                                                                       |
| --------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`    | `"accountDataValueNode"`  | The node discriminator.                                                                                                                                                                                                                                                                                                                                                           |
| `account` | `IdentifierString`        | The identifier of the referenced account in the surrounding instruction.                                                                                                                                                                                                                                                                                                          |
| `path`    | `PathString` _(optional)_ | The path to the value within the account's decoded data — e.g. `authority` or `state.balances[0]`. Field segments are only valid where the data type resolves to a struct (following type links), and a `.data` segment crosses a public key's `accountLink` into the linked account's data, e.g. `mint.data.decimals`. When absent, the value is the whole decoded account data. |

### Children

| Attribute | Type                                            | Description                                     |
| --------- | ----------------------------------------------- | ----------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. |

## Examples

### Create an account data value node from an account name and a path

```typescript
const node = accountDataValueNode('mint', 'decimals');
```

### A data field defaulting to a value within an instruction account

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
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'decimals',
            type: integerTypeNode('u8'),
            defaultValue: injectedValueNode({ key: 'decimals' }),
        }),
        // ...
    ]),
    provides: [providedNode('decimals', accountDataValueNode('mint', 'decimals'))],
});
```
