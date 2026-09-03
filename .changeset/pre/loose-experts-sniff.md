---
'@codama/spec': major
---

Remove dead meta-model surface from the `@codama/spec/api` entrypoint. Under the one-major-per-line model, the API on a release line serves exactly its own spec content — machinery that nothing uses any more is dead code, not version-agnostic generosity. Anything needing v1 semantics obtains them from `@codama/spec@^1`.

**BREAKING CHANGES**

**The nested-union machinery is removed end to end.** `defineNestedUnion`, the `NestedUnionSpec` type, `CategorySpec.nestedUnions`, the `nestedUnion()` type-expression helper and its `TypeExpr` variant, the associated validation rules, and the docs generator's recursive-alias pages all go — the flat `transforms` design replaced recursive aliases, and encoded specs no longer carry empty `nestedUnions` arrays.

**The float and tuple type expressions are removed.** `f32()`, `f64()`, `FloatWidth` and the `float` `TypeExpr` variant died with `numberValueNode` (attribute-level floats were a design we deliberately killed — data values are string-encoded); `tuple()` and the `tuple` variant, plus the `count()` semantic alias, had no remaining call sites. The integer width helpers stay intact as one coherent vocabulary.
