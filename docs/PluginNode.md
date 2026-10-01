# PluginNode

Attaches namespaced, plugin-specific data to a node.
A plugin is uniquely identified by its `namespace`; the optional `payload` carries arbitrary, consumer-defined data that only the matching plugin knows how to interpret. Codama itself treats the payload as opaque.
Every node can carry plugins via the `plugins` base attribute.

The `codama.*` namespace is reserved for official plugins, defined by this specification for information that is renderer-specific by nature:

- `codama.resolver` — on a node whose value renderers resolve with custom code rather than from the IDL, e.g. an instruction account, a struct field, remaining accounts or a byte delta. Its payload is `{ name, dependsOn? }`: the `name` of the resolver function, and the inputs it depends on as `accounts.<identifier>` or `data.<path>` strings, e.g. `["accounts.mint", "data.config.fee"]`.
- `codama.extraArgument` — on an instruction node, one per client input that is not serialised in the instruction data, e.g. to feed a resolver. Its payload is `{ identifier, type, defaultValue?, docs? }`, where `type` and `defaultValue` are the JSON of a type node and a value node.

Like any payload, these are inert: renaming the nodes they reference does not update them.

## Attributes

### Data

| Attribute   | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`      | `"pluginNode"`      | The node discriminator.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `namespace` | `NamespaceString`   | The unique, dot-separated namespace identifying the plugin this data belongs to (e.g. `i18n.es`). There is no central registry. Some namespaces are agreed ecosystem-wide conventions — such as `i18n.*` for translations — and may be used as such; otherwise, to keep namespaces unambiguous, prefix them with a name you control — a package, crate or organisation name. The `codama.*` prefix is reserved for the official plugins listed above.                                                                                                                                                          |
| `payload`   | `Json` _(optional)_ | Arbitrary, plugin-specific data. Its shape is defined by the plugin, not by Codama, and is carried through the graph verbatim. Payloads are inert data: they are never traversed by visitors and never validated, and identifier references inside them are not maintained by tree transformations — a payload that mimics node shapes gets none of a node’s guarantees. Plugins never change the meaning of the node they decorate — its byte layout, resolution semantics or any other behaviour; they only annotate it. Consumers that do not recognise a namespace can therefore safely ignore the plugin. |

### Children

| Attribute | Type                                           | Description                                     |
| --------- | ---------------------------------------------- | ----------------------------------------------- |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. |

## Examples

### A plugin carrying custom structured data

```typescript
pluginNode('explorerHints', {
    payload: { icon: 'transfer-arrow', priority: 2 },
});
```

### A marker plugin without a payload

```typescript
pluginNode('audited');
```

### An instruction tagged with a plugin

```typescript
instructionNode({
    identifier: 'transfer',
    plugins: [pluginNode('explorerHints', { payload: { icon: 'transfer-arrow' } })],
    // ...
});
```

### Official plugins describing a resolver and the extra argument it depends on

```typescript
instructionNode({
    identifier: 'transfer',
    accounts: [
        instructionAccountNode({
            identifier: 'destination',
            isWritable: true,
            isSigner: false,
            plugins: [
                pluginNode('codama.resolver', {
                    payload: { name: 'resolveDestination', dependsOn: ['accounts.owner', 'data.useAta'] },
                }),
            ],
        }),
        // ...
    ],
    plugins: [
        pluginNode('codama.extraArgument', {
            payload: { identifier: 'useAta', type: booleanTypeNode() },
        }),
    ],
});
```
