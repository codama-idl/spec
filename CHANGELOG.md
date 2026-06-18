# @codama/spec

## 1.7.0-rc.0

### Minor Changes

- [#28](https://github.com/codama-idl/spec/pull/28) [`e3bd896`](https://github.com/codama-idl/spec/commit/e3bd896c7cab1febc9ef3258377baa66940486c9) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Add a presentation layer to the spec covering how instructions, accounts, fields, enum variants, and individual values are displayed to a user.

  A new `display` category introduces eight nodes. `instructionDisplayNode` carries a short `intent` label and an `interpolatedIntent` sentence template with `${root.path}` placeholders rooted at `data.` (instruction arguments) or `accounts.` (instruction accounts). `instructionAccountDisplayNode` and `structFieldDisplayNode` carry a `label` and a `skip` rule from a new `displaySkip` enumeration (`always` / `never` / `whenInjected`, the last variant gating visibility on whether the value was already surfaced elsewhere through the provide/inject graph). `structFieldDisplayNode` additionally carries flat `flatten` and `flattenPrefix` attributes that lift a nested struct into its parent's context. `enumVariantDisplayNode` carries a `label` and a `skipInnerData` toggle. Four value-presentation nodes describe how a number or string is rendered: `amountNumberDisplayNode` (`decimals` and `unit` slots), `dateTimeNumberDisplayNode` (a `ticksPerSecond` divisor that converts ticks back to seconds), `durationNumberDisplayNode` (the same divisor, marking the value as an elapsed span), and `stringDisplayNode` (flat `sliceStart`/`sliceEnd` indices over the decoded character sequence).

  A provide/inject primitive lets reusable types pull contextual values without naming siblings. `providedNode` (a top-level node) exposes a node under a `name` so consumers in the surrounding scope can resolve it by that key; it sits inside the new `instructionNode.provides` list. `injectedValueNode` (a value node, valid anywhere a `valueNode` is) carries a `key` and an optional `fallback`, resolving against the surrounding provider graph. Two purpose unions, `injectableNumberValueNode` and `injectableStringValueNode`, type the slots on `amountNumberDisplayNode` so a literal value or an injected key are both accepted while the validator still rejects nonsense.

  A new `accountFieldValueNode` (a contextual value) selects a field from a named account's decoded data; it relies on the new optional `instructionAccountNode.accountLink` to know the account's layout, including cross-program references via `accountLinkNode.program`.

  The meta-model gains an `anyNode` `TypeExpr` for slots that carry an arbitrary node without enumerating each kind by hand (used by `providedNode.node`). Codegen targets map it to their top-level `Node` registry type.

  Every host change is optional and additive: existing consumers and the generated wire format are untouched. `SPEC_VERSION` bumps to `1.7.0`.

## 1.6.0

### Minor Changes

- [`4a46ebf`](https://github.com/codama-idl/spec/commit/4a46ebf6ef88d9e170e7174fcb104bd93fd389f3) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Add a `'docs'` `TypeExpr` kind for documentation arrays. The `docs()` semantic alias now returns `{ kind: 'docs' }` rather than desugaring to `array(string())`, preserving the documentation intent in the encoded spec. Each codegen target maps the new kind to the language's idiomatic documentation array type (e.g. `Array<string>` in TypeScript, `Vec<String>` in Rust).

  Expose the authoring API at the new `@codama/spec/api` subpath. Consumers building hand-authored specs (typically test fixtures or future tooling) can now import `defineNode`, `attribute`, `optionalAttribute`, primitives (`u32`, `string`, `boolean`, …), compounds (`array`, `tuple`), `defineUnion`, `defineEnumeration`, and `variant` directly. The default `@codama/spec` entrypoint continues to expose the latest version's spec data and types only.

  The `gen-ts-node-types` generator now emits arrays as `Array<T>` rather than `T[]`, so a literal-union element type (e.g. `array(literalUnion(true, 'either'))`) doesn't need extra parentheses to preserve precedence with `|`. The generator also collapses `literalUnion(true, false, …)` to `boolean | …` when both `true` and `false` are present — a TypeScript-only readability normalisation; the encoded spec keeps the explicit `true | false` representation so other codegen targets can still emit a multi-variant enum.

- [`70febc6`](https://github.com/codama-idl/spec/commit/70febc6f3ffbdad235c01d120e521fb2051aab16) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Reshape the spec meta-model into per-category groups, replace the top-level `nestedTypeNodeWrappers` list with a flexible `NestedUnionSpec` construct, and type all `docs?` fields as `readonly string[]`.

  `Spec` no longer carries flat `nodes`, `unions`, `enumerations`, and `nestedTypeNodeWrappers` lists. Instead, `Spec.categories: readonly CategorySpec[]` groups related entities together — each `CategorySpec` carries its own `nodes`, `unions`, `enumerations`, and `nestedUnions`. Category names are arbitrary strings; codegen targets pick how to honour them. The v1 spec uses `'type'`, `'value'`, `'link'`, `'pdaSeed'`, `'count'`, `'discriminator'`, `'contextualValue'`, `'shared'`, and `'topLevel'`.

  `NestedUnionSpec` replaces the implicit `nestedTypeNodeWrappers` list with an explicit, named recursive type alias. Each `NestedUnionSpec` carries a `name`, a `base: TypeExpr`, and a `wrappers: readonly string[]` list. The v1 spec declares one such alias (`NestedTypeNode`) under the `type` category. The `nestedTypeNode(name)` `TypeExpr` constructor is renamed to `nestedUnion(alias, innerKind)` to make the alias reference explicit, opening the door to further recursive families in future spec versions.

  All `docs?` fields on `AttributeSpec`, `NodeSpec`, `UnionSpec`, `EnumerationSpec`, `EnumerationVariantSpec`, `CategorySpec`, and `NestedUnionSpec` now take `readonly string[]` — one paragraph per array element. This brings the meta-model into alignment with the generated `Docs = Array<string>` shape and lets codegen targets render multi-paragraph documentation natively.

  New authoring helpers: `defineCategory(name, options)` and `defineNestedUnion(name, options)`. The `gen-ts-node-types` generator is updated to walk the new structure, renders one alias file per `NestedUnionSpec`, and maps each spec category to its TypeScript-monorepo subdirectory via a small renderer-side table.

- [`cb59ce7`](https://github.com/codama-idl/spec/commit/cb59ce770097319f5173f6bb5dd38751047bdff2) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Two spec changes that adjust the encoded shape:

  - **Identifier casing.** All spec identifiers are now camelCase. Enumerations, unions, and nested-union aliases that were PascalCase (`TypeNode`, `BytesEncoding`, `NestedTypeNode`, …) are renamed to camelCase (`typeNode`, `bytesEncoding`, `nestedTypeNode`, …). `validate.ts` now enforces camelCase on unions, enumerations, and nested unions alongside the existing node-kind check.

  - **New `address` type-expression kind.** A new primitive `{ kind: 'address' }` (plus an `address()` factory) replaces `string()` on attributes that hold a Solana address. Applied to `programNode.publicKey`, `publicKeyValueNode.publicKey`, and `pdaNode.programId`. Attribute names and node kinds are unchanged; only the type expression changes. Codegen targets can now render these as a dedicated address type (e.g. `Address` in Rust) rather than collapsing to a generic string.

- [#20](https://github.com/codama-idl/spec/pull/20) [`55d06e2`](https://github.com/codama-idl/spec/commit/55d06e29387f13d3b0aac0ab0781a43df6c4d3fc) Thanks [@lorisleiva](https://github.com/lorisleiva)! - First stable release of `@codama/spec`. The v1 spec shape settled across the `1.6.0-rc.*` line is now published as `1.6.0`. Reference implementations in [TypeScript](https://github.com/codama-idl/codama) and [Rust](https://github.com/codama-idl/codama-rs) consume this package to render their own node types, factories, visitors, and validators from a single source of truth. Future Codama majors will land alongside the `v1` entrypoint as `v2`, `v3`, …, with the default `@codama/spec` entrypoint tracking the latest stable.

### Patch Changes

- [`f345ba3`](https://github.com/codama-idl/spec/commit/f345ba3c7f6800e16c1afca8656edca8c8c7ece1) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Disable `splitting` in the tsup build config.

  Multi-entry ESM builds (`index` + `v1`) were causing tsup's automatic code splitting to lift shared modules into hashed `chunk-*.mjs` files. Those chunks were not listed in `package.json#files`, so the published tarball shipped entrypoints that re-exported from missing modules and ESM consumers failed at import time with `Cannot find module '...chunk-XXXXX.node.mjs'`. Disabling splitting makes each entry inline its dependencies and the published `dist/` self-contained.

## 1.6.0-rc.6

### Minor Changes

- [`a00aff0`](https://github.com/codama-idl/spec/commit/a00aff09e1479487fc6344b6ace4506830960df6) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Revert the twelve vec-of-children attribute flips introduced in rc.5. In v1 these arrays stay required, matching their pre-rc.5 shape:

  - `programNode.accounts`, `instructions`, `definedTypes`, `pdas`, `events`, `errors`, `constants`
  - `rootNode.additionalPrograms`
  - `instructionNode.accounts`, `arguments`
  - `pdaNode.seeds`
  - `pdaValueNode.seeds`

  The optional encoding is deferred to a future spec major. Keeping these arrays required in v1 means existing codegen targets (JS, Rust) don't have to special-case the "empty array vs. absent" distinction mid-cycle, and consumers of the published types don't need to migrate every iteration over `program.instructions`, `instruction.accounts`, etc. to defensive `?? []`. The camelCase rename and the new `{ kind: 'address' }` `TypeExpr` from rc.5 are preserved.

  Attributes whose emptiness already encodes structural meaning (`structTypeNode.fields`, `tupleTypeNode.items`, `enumTypeNode.variants`, value-side equivalents, `hiddenPrefixTypeNode.prefix`, `hiddenSuffixTypeNode.suffix`) were never touched by rc.5 and remain required.

## 1.6.0-rc.5

### Minor Changes

- cb59ce7: Three spec changes that adjust the encoded shape:

  - **Identifier casing.** All spec identifiers are now camelCase. Enumerations, unions, and nested-union aliases that were PascalCase (`TypeNode`, `BytesEncoding`, `NestedTypeNode`, …) are renamed to camelCase (`typeNode`, `bytesEncoding`, `nestedTypeNode`, …). `validate.ts` now enforces camelCase on unions, enumerations, and nested unions alongside the existing node-kind check.

  - **New `address` type-expression kind.** A new primitive `{ kind: 'address' }` (plus an `address()` factory) replaces `string()` on attributes that hold a Solana address. Applied to `programNode.publicKey`, `publicKeyValueNode.publicKey`, and `pdaNode.programId`. Attribute names and node kinds are unchanged; only the type expression changes. Codegen targets can now render these as a dedicated address type (e.g. `Address` in Rust) rather than collapsing to a generic string.

  - **Empty arrays omitted from the wire (where semantically equivalent to absent).** Array-of-child attributes flip to optional on nodes where an empty array carries no meaning beyond "no children of this kind": `programNode`'s seven child arrays (`accounts`, `instructions`, `definedTypes`, `pdas`, `events`, `errors`, `constants`), `rootNode.additionalPrograms`, `instructionNode.accounts` and `arguments`, `pdaNode.seeds`, and `pdaValueNode.seeds`. Attributes whose emptiness encodes structural meaning (`structTypeNode.fields`, `tupleTypeNode.items`, `enumTypeNode.variants`, value-side equivalents, `hiddenPrefixTypeNode.prefix`, `hiddenSuffixTypeNode.suffix`) remain required.

## 1.6.0-rc.4

### Minor Changes

- 70febc6: Reshape the spec meta-model into per-category groups, replace the top-level `nestedTypeNodeWrappers` list with a flexible `NestedUnionSpec` construct, and type all `docs?` fields as `readonly string[]`.

  `Spec` no longer carries flat `nodes`, `unions`, `enumerations`, and `nestedTypeNodeWrappers` lists. Instead, `Spec.categories: readonly CategorySpec[]` groups related entities together — each `CategorySpec` carries its own `nodes`, `unions`, `enumerations`, and `nestedUnions`. Category names are arbitrary strings; codegen targets pick how to honour them. The v1 spec uses `'type'`, `'value'`, `'link'`, `'pdaSeed'`, `'count'`, `'discriminator'`, `'contextualValue'`, `'shared'`, and `'topLevel'`.

  `NestedUnionSpec` replaces the implicit `nestedTypeNodeWrappers` list with an explicit, named recursive type alias. Each `NestedUnionSpec` carries a `name`, a `base: TypeExpr`, and a `wrappers: readonly string[]` list. The v1 spec declares one such alias (`NestedTypeNode`) under the `type` category. The `nestedTypeNode(name)` `TypeExpr` constructor is renamed to `nestedUnion(alias, innerKind)` to make the alias reference explicit, opening the door to further recursive families in future spec versions.

  All `docs?` fields on `AttributeSpec`, `NodeSpec`, `UnionSpec`, `EnumerationSpec`, `EnumerationVariantSpec`, `CategorySpec`, and `NestedUnionSpec` now take `readonly string[]` — one paragraph per array element. This brings the meta-model into alignment with the generated `Docs = Array<string>` shape and lets codegen targets render multi-paragraph documentation natively.

  New authoring helpers: `defineCategory(name, options)` and `defineNestedUnion(name, options)`. The `gen-ts-node-types` generator is updated to walk the new structure, renders one alias file per `NestedUnionSpec`, and maps each spec category to its TypeScript-monorepo subdirectory via a small renderer-side table.

## 1.6.0-rc.3

### Minor Changes

- 4a46ebf: Add a `'docs'` `TypeExpr` kind for documentation arrays. The `docs()` semantic alias now returns `{ kind: 'docs' }` rather than desugaring to `array(string())`, preserving the documentation intent in the encoded spec. Each codegen target maps the new kind to the language's idiomatic documentation array type (e.g. `Array<string>` in TypeScript, `Vec<String>` in Rust).

  Expose the authoring API at the new `@codama/spec/api` subpath. Consumers building hand-authored specs (typically test fixtures or future tooling) can now import `defineNode`, `attribute`, `optionalAttribute`, primitives (`u32`, `string`, `boolean`, …), compounds (`array`, `tuple`), `defineUnion`, `defineEnumeration`, and `variant` directly. The default `@codama/spec` entrypoint continues to expose the latest version's spec data and types only.

  The `gen-ts-node-types` generator now emits arrays as `Array<T>` rather than `T[]`, so a literal-union element type (e.g. `array(literalUnion(true, 'either'))`) doesn't need extra parentheses to preserve precedence with `|`. The generator also collapses `literalUnion(true, false, …)` to `boolean | …` when both `true` and `false` are present — a TypeScript-only readability normalisation; the encoded spec keeps the explicit `true | false` representation so other codegen targets can still emit a multi-variant enum.

## 1.6.0-rc.2

### Patch Changes

- f345ba3: Disable `splitting` in the tsup build config.

  Multi-entry ESM builds (`index` + `v1`) were causing tsup's automatic code splitting to lift shared modules into hashed `chunk-*.mjs` files. Those chunks were not listed in `package.json#files`, so the published tarball shipped entrypoints that re-exported from missing modules and ESM consumers failed at import time with `Cannot find module '...chunk-XXXXX.node.mjs'`. Disabling splitting makes each entry inline its dependencies and the published `dist/` self-contained.

## 1.6.0-rc.1

### Patch Changes

- d963306: Verify the end-to-end changeset → OIDC trusted publishing flow by cutting `1.6.0-rc.1`. No code changes; this release only exists to confirm that `changesets/action` can publish via npm trusted publishing without a long-lived `NPM_TOKEN` in CI.
