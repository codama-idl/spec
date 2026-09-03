# PluginNode

Attaches namespaced, plugin-specific data to a node.
A plugin is uniquely identified by its `namespace`; the optional `payload` carries arbitrary, consumer-defined data that only the matching plugin knows how to interpret. Codama itself treats the payload as opaque.
Every node can carry plugins via the `plugins` base attribute.

## Attributes

### Data

| Attribute   | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`      | `"pluginNode"`      | The node discriminator.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `namespace` | `NamespaceString`   | The unique, dot-separated namespace identifying the plugin this data belongs to (e.g. `i18n.es`). There is no central registry. Some namespaces are agreed ecosystem-wide conventions — such as `i18n.*` for translations — and may be used as such; otherwise, to keep namespaces unambiguous, prefix them with a name you control — a package, crate or organisation name. Avoid the `codama.*` prefix, which may conflict with experimental Codama features in the future.                                                                                                                                  |
| `payload`   | `Json` _(optional)_ | Arbitrary, plugin-specific data. Its shape is defined by the plugin, not by Codama, and is carried through the graph verbatim. Payloads are inert data: they are never traversed by visitors and never validated, and identifier references inside them are not maintained by tree transformations — a payload that mimics node shapes gets none of a node’s guarantees. Plugins never change the meaning of the node they decorate — its byte layout, resolution semantics or any other behaviour; they only annotate it. Consumers that do not recognise a namespace can therefore safely ignore the plugin. |

### Children

| Attribute | Type                                           | Description                                                                                                                           |
| --------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

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
