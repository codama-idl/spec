---
'@codama/spec': patch
---

Correct the upgrade guidance for v1 tuple variants holding a single item. Upgrading a v1 IDL should keep such variants as tuples, e.g. `enumTupleVariantTypeNode('wait', tupleTypeNode([numberTypeNode('u64')]))` becomes `enumVariantTypeNode('wait', { data: tupleTypeNode([integerTypeNode('u64')]) })`, along with the tuple payloads of their `enumValueNode`s. This keeps the upgrade a faithful translation of the v1 IDL, leaving generated APIs unchanged. Authors may then simplify these variants to `{ data: integerTypeNode('u64') }` themselves, and renderers may unwrap them before rendering if they wish. This supersedes the earlier guidance to unwrap them into their single item.
