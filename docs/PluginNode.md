# PluginNode

Attaches named, plugin-specific data to a node.
A plugin is uniquely identified by its `name`; the optional `payload` carries arbitrary, consumer-defined data that only the matching plugin knows how to interpret. Codama itself treats the payload as opaque.
Every node can carry plugins via the `plugins` base attribute.

## Attributes

### Data

| Attribute | Type                | Description                                                                                                                    |
| --------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `kind`    | `"pluginNode"`      | The node discriminator.                                                                                                        |
| `name`    | `NamespaceString`   | The unique, dot-separated namespace identifying the plugin this data belongs to (e.g. `i18n.es`).                              |
| `payload` | `Json` _(optional)_ | Arbitrary, plugin-specific data. Its shape is defined by the plugin, not by Codama, and is carried through the graph verbatim. |

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
