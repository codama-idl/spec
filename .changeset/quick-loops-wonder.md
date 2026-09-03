---
'@codama/spec': major
---

Introduce `textNode` and make every human-facing attribute text-shaped: the union `string | textNode`. A plain string is the common spelling; the `textNode` arm carries the same content plus `plugins`, so structured text metadata — e.g. translations under the `i18n.*` namespace convention — attaches without further spec changes. The tree always holds exactly what the JSON says: there is no normalisation between the two arms, and the canonical form of plugin-free text is the plain string (a plugin-free `textNode` is valid but non-canonical, flagged by validators as a lint).

**BREAKING CHANGES**

**Prose attributes become `string | textNode`.** `docs` (on every documented node), `errorNode.message`, `instructionStatusNode.message`, `instructionDisplayNode.intent`/`interpolatedIntent`, the display `label`s and `flattenPrefix` all carry the new `text`-shaped type expressions. Existing plain strings remain valid as-is — the rich arm is opt-in.

```jsonc
// The common spelling — unchanged:
"intent": "Transfer"

// The rich arm, when metadata attaches:
"intent": {
    "kind": "textNode",
    "content": "Transfer",
    "plugins": [{ "kind": "pluginNode", "namespace": "i18n.es", "payload": "Transferir" }]
}
```

**`docs` becomes a single text value.** The v1 array-of-lines encoding is replaced by one `string | textNode` value using `\n` for multiple lines; the `docs` type expression keeps its documentation-intent kind.

```diff
- "docs": ["Transfers tokens.", "Fails when the account is frozen."]
+ "docs": "Transfers tokens.\nFails when the account is frozen."
```

**Text attributes classify as children.** Their values may be `textNode`s carrying plugin nodes, so visitors traverse them like any other child.

Multi-line text is a per-attribute convention (`docs` may be multi-line; intents, labels and messages are single-line), enforced as validator warnings. Identifiers are not text — they remain machine keys with their own rules, and `unit` stays a plain string: a quantity identifier, not prose.
