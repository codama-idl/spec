---
'@codama/spec': minor
---

Reserve the `codama.*` plugin namespace for official plugins, and define the first two for information that is renderer-specific by nature. `codama.resolver` marks a node whose value renderers resolve with custom code, with a `{ name, dependsOn? }` payload where dependencies are `accounts.<identifier>` or `data.<path>` strings. `codama.extraArgument` declares, on an instruction node, a client input that is not serialised in the instruction data, with an `{ identifier, type, defaultValue?, docs? }` payload. The remaining accounts example now uses `codama.resolver` instead of the unofficial `codama.jsResolver`.

```ts
instructionAccountNode({
    identifier: 'destination',
    isWritable: true,
    isSigner: false,
    plugins: [pluginNode('codama.resolver', { payload: { name: 'resolveDestination', dependsOn: ['accounts.owner'] } })],
});
```
