---
'@codama/spec': patch
---

Carry resolver docs and default value strategies in the official plugins. The `codama.resolver` payload gains an optional `docs` field describing the resolver, and the `codama.extraArgument` payload gains an optional `defaultValueStrategy`, as for struct fields. A struct field resolved by a `codama.resolver` plugin may now carry a `defaultValueStrategy`, which applies to the resolved value as it would to a `defaultValue`, e.g. `omitted` keeps the field out of generated inputs.

```ts
structFieldTypeNode({
    identifier: 'tags',
    type: integerTypeNode('u8'),
    defaultValueStrategy: 'omitted',
    plugins: [pluginNode('codama.resolver', { payload: { name: 'resolveTags', docs: 'Derives tags from the name.' } })],
});
```
