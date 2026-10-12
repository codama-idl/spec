---
'@codama/spec': patch
---

Document how to resolve the default of an extra argument with custom code. A `codama.resolver` plugin on a `codama.extraArgument` plugin node describes how renderers resolve that extra argument's default, as it would on a struct field.

```ts
pluginNode('codama.extraArgument', {
    payload: { identifier: 'tokenStandard', type: definedTypeLinkNode('tokenStandard') },
    plugins: [pluginNode('codama.resolver', { payload: { name: 'resolveTokenStandard', dependsOn: ['accounts.mint'] } })],
});
```
