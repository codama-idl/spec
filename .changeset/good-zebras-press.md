---
'@codama/spec': major
---

Rename `name` to `identifier` on every named node and drop the camelCase mandate. Identifiers are constrained by charset only — `[A-Za-z_][A-Za-z0-9_]*` — so `transferTokens`, `transfer_tokens` and `TransferTokens` are all valid; renderers convert to their own casing conventions.

**BREAKING CHANGES**

**Every `name` attribute becomes `identifier`, except on `pluginNode` where it becomes `namespace`.** The rename makes the machine-key role explicit; a plugin's key is not an identifier but a dot-separated chain of identifiers (e.g. `i18n.es`), carried by the new `namespace` string constraint and named accordingly. No v2 node has a `name` attribute.

```diff
  {
      "kind": "instructionNode",
-     "name": "transferTokens",
+     "identifier": "transferTokens",
      // ...
  }
```

**Casing is no longer part of the standard.** Instead of mandating camelCase, identifiers sharing a scope must remain unique after lowercasing and stripping underscores (`my_field` and `myField` cannot coexist), so renderers converting both to a target convention never collide. Every valid v1 camelCase name is already a valid v2 identifier.

**The meta-model's `StringConstraint` gains `'namespace'`**, with a matching `stringNamespace()` authoring helper; the generated docs render the constraints as `IdentifierString` and `NamespaceString` (formerly `CamelCaseString`).
