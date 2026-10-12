---
'@codama/spec': minor
---

Let public keys link to the account they point to. `publicKeyTypeNode` gains an optional `accountLink`, and path expressions crossing a linked public key continue into the linked account's decoded data, so values a few accounts away become reachable, e.g. the decimals of the mint of a token account. Such paths require reading account state at presentation time and fall back as usual when the account is missing or cannot be decoded. Field discriminators must not cross account links.

```ts
structFieldTypeNode({ identifier: 'mint', type: publicKeyTypeNode({ accountLink: accountLinkNode('mint') }) });
providedNode('decimals', accountDataValueNode('inputTokenAccount', 'mint.decimals'));
```
