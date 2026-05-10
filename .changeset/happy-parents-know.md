---
'@codama/spec': minor
---

Add a `'docs'` `TypeExpr` kind for documentation arrays. The `docs()` semantic alias now returns `{ kind: 'docs' }` rather than desugaring to `array(string())`, preserving the documentation intent in the encoded spec. Each codegen target maps the new kind to the language's idiomatic documentation array type (e.g. `Array<string>` in TypeScript, `Vec<String>` in Rust).

Expose the authoring API at the new `@codama/spec/api` subpath. Consumers building hand-authored specs (typically test fixtures or future tooling) can now import `defineNode`, `attribute`, `optionalAttribute`, primitives (`u32`, `string`, `boolean`, …), compounds (`array`, `tuple`), `defineUnion`, `defineEnumeration`, and `variant` directly. The default `@codama/spec` entrypoint continues to expose the latest version's spec data and types only.

The `gen-ts-node-types` generator now emits arrays as `Array<T>` rather than `T[]`, so a literal-union element type (e.g. `array(literalUnion(true, 'either'))`) doesn't need extra parentheses to preserve precedence with `|`. The generator also collapses `literalUnion(true, false, …)` to `boolean | …` when both `true` and `false` are present — a TypeScript-only readability normalisation; the encoded spec keeps the explicit `true | false` representation so other codegen targets can still emit a multi-variant enum.
