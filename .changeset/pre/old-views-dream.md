---
'@codama/spec': minor
---

Add an optional `returnData` type node to `instructionNode`, describing the data an instruction returns to its caller via `set_return_data` — e.g. what Anchor IDLs expose as `returns`. Like `data`, it accepts any type node, including a `definedTypeLinkNode`. The on-chain limit on return data is left to validators.

```ts
instructionNode({ identifier: 'getPrice', returnData: integerTypeNode('u64') });
```
