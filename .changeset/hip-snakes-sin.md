---
'@codama/spec': minor
---

Reshape the spec meta-model into per-category groups, replace the top-level `nestedTypeNodeWrappers` list with a flexible `NestedUnionSpec` construct, and type all `docs?` fields as `readonly string[]`.

`Spec` no longer carries flat `nodes`, `unions`, `enumerations`, and `nestedTypeNodeWrappers` lists. Instead, `Spec.categories: readonly CategorySpec[]` groups related entities together — each `CategorySpec` carries its own `nodes`, `unions`, `enumerations`, and `nestedUnions`. Category names are arbitrary strings; codegen targets pick how to honour them. The v1 spec uses `'type'`, `'value'`, `'link'`, `'pdaSeed'`, `'count'`, `'discriminator'`, `'contextualValue'`, `'shared'`, and `'topLevel'`.

`NestedUnionSpec` replaces the implicit `nestedTypeNodeWrappers` list with an explicit, named recursive type alias. Each `NestedUnionSpec` carries a `name`, a `base: TypeExpr`, and a `wrappers: readonly string[]` list. The v1 spec declares one such alias (`NestedTypeNode`) under the `type` category. The `nestedTypeNode(name)` `TypeExpr` constructor is renamed to `nestedUnion(alias, innerKind)` to make the alias reference explicit, opening the door to further recursive families in future spec versions.

All `docs?` fields on `AttributeSpec`, `NodeSpec`, `UnionSpec`, `EnumerationSpec`, `EnumerationVariantSpec`, `CategorySpec`, and `NestedUnionSpec` now take `readonly string[]` — one paragraph per array element. This brings the meta-model into alignment with the generated `Docs = Array<string>` shape and lets codegen targets render multi-paragraph documentation natively.

New authoring helpers: `defineCategory(name, options)` and `defineNestedUnion(name, options)`. The `gen-ts-node-types` generator is updated to walk the new structure, renders one alias file per `NestedUnionSpec`, and maps each spec category to its TypeScript-monorepo subdirectory via a small renderer-side table.
