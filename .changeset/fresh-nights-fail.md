---
'@codama/spec': major
---

Unify enum variants into a single `enumVariantTypeNode` with an optional `data` payload. The node also gains an optional `docs` attribute, closing the gap where enum variants could not carry documentation.

**BREAKING CHANGES**

**`enumEmptyVariantTypeNode`, `enumStructVariantTypeNode` and `enumTupleVariantTypeNode` are replaced by `enumVariantTypeNode`.** Absent `data` is a unit variant; a struct payload gives named fields, a tuple payload gives positional fields, and any other type node is carried as-is. The `name`, optional `discriminator` and optional `display` attributes carry over unchanged; the former `struct`/`tuple` attributes both become `data`. When upgrading, a v1 tuple variant holding exactly one item should unwrap to that single type — the 1-tuple was the workaround spelling of a single-type payload — **unless** the item is a `structTypeNode`, `tupleTypeNode` or `definedTypeLinkNode`: those shapes determine the variant flavour in `data` position, so unwrapping them would change the generated API (e.g. `V(InlineStruct)` becoming `V { … }`) even though the wire format is identical. Renderers whose target requires a wrapper (e.g. Rust) re-wrap single-type payloads on their side.

```diff
  enumTypeNode([
-     enumEmptyVariantTypeNode('flip'),
-     enumTupleVariantTypeNode('rotate', tupleTypeNode([numberTypeNode('u32')])),
-     enumStructVariantTypeNode('move', structTypeNode([/* … */])),
+     enumVariantTypeNode('flip'),
+     enumVariantTypeNode('rotate', numberTypeNode('u32')),
+     enumVariantTypeNode('move', structTypeNode([/* … */])),
  ]);
```

**The `enumVariantTypeNode` union no longer exists.** The name now identifies the node itself; `enumTypeNode.variants` is an array of that node, and the `registeredTypeNode` union references it directly.
