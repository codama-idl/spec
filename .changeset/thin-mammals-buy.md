---
'@codama/spec': major
---

Introduce path expressions as the shared reference DSL. A path points into nested data with the grammar `identifier ( "." identifier | "[" integer "]" )*` — e.g. `amount` or `config.fees[0]` — carried by the new `path` string constraint (`stringPath()` helper, rendered as `PathString`). Interpolated intent templates embed the same expressions as `${root.path}` placeholders, so one grammar serves reference nodes and display interpolation alike. The generated docs root page gains a "Constrained strings" glossary defining `IdentifierString`, `NamespaceString`, `PathString` and `SemverString`.

**BREAKING CHANGES**

**Flat references become paths.** `argumentValueNode.name` (v1) becomes `argumentValueNode.path`, `fieldDiscriminatorNode.name` (v1) becomes `fieldDiscriminatorNode.path`, and `accountFieldValueNode.path` widens from a single field identifier to a path expression. Every v1 flat name is already a valid path, so values pass through unchanged.

```diff
- argumentValueNode('amount')          // v1: a top-level argument name
+ argumentValueNode('amount')          // v2: same value, now a path…
+ argumentValueNode('config.fees[0]')  // …which can reach nested data
```

**Interpolated intents are no longer flat-only.** `${data.…}` and `${accounts.…}` placeholders in `instructionDisplayNode.interpolatedIntent` accept the full path grammar after the root (e.g. `${data.config.fees[0]}`).
