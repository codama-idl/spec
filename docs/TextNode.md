# TextNode

A piece of human-facing text carrying structured metadata — the rich arm of the `string | textNode` union used by `docs`, display intents, labels and messages.
Being a node, it takes `plugins` like any other, which is how text metadata attaches without further spec changes — e.g. translations under the `i18n.*` namespace convention, where each payload is the translated content.
The canonical form of plugin-free text is the plain string: a `textNode` without plugins is valid but non-canonical, which validators flag as a lint. The tree always holds exactly what the JSON says.
Multi-line text uses `\n` within `content`; whether a given attribute may be multi-line is a per-attribute convention — `docs` may, intents, labels and messages are single-line by convention.

## Attributes

### Data

| Attribute | Type         | Description                                          |
| --------- | ------------ | ---------------------------------------------------- |
| `kind`    | `"textNode"` | The node discriminator.                              |
| `content` | `string`     | The text itself, in the default language of the IDL. |

### Children

| Attribute | Type                                           | Description                                                                                                                           |
| --------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Plain text — the canonical spelling when no metadata is attached

```jsonc
"docs": "Transfers tokens.\nFails when the account is frozen."
```

### Translated text

```jsonc
"intent": {
    "kind": "textNode",
    "content": "Transfer",
    "plugins": [
        { "kind": "pluginNode", "namespace": "i18n.es", "payload": "Transferir" },
        { "kind": "pluginNode", "namespace": "i18n.fr", "payload": "Transf\u00e9rer" }
    ]
}
```

### A translated display intent, via the node factories

```typescript
instructionDisplayNode({
    intent: textNode('Transfer', {
        plugins: [pluginNode('i18n.es', { payload: 'Transferir' })],
    }),
});
```
