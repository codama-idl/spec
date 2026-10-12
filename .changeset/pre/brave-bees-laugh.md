---
'@codama/spec': minor
---

Let interpolated intents read account data. After the `accounts` root, an account identifier may be followed by `.data` and a path into the account's decoded data, resolved as `accountDataValueNode` does, e.g. `${accounts.destination.data.owner}`. Other segments after an account identifier are reserved for future attributes of the account, such as its lamports, and are invalid until then. The docs also note that `${data…}` paths may cross a public key's `accountLink`.

```ts
instructionDisplayNode({
    intent: 'Transfer',
    interpolatedIntent: 'Transfer ${data.amount} to ${accounts.destination.data.owner}',
});
```
