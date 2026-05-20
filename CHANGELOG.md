# @codama/spec

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
