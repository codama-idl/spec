---
'@codama/spec': major
---

Allow any type node as account data. `accountNode.data` now accepts every member of the `typeNode` union — links included — aligning it with `eventNode.data`, so accounts can be non-structs or reuse a shared defined type via `definedTypeLinkNode`.

**BREAKING CHANGES**

**`accountNode.data` widens from `structTypeNode` to `typeNode`.** Consumers can no longer assume account data is a struct; nodes that reference account fields by name (`accountFieldValueNode`, `fieldDiscriminatorNode`, PDA seed defaults) are only valid when the data type resolves to a struct, following links — a constraint enforced by validators rather than by the spec shape.

```diff
  accountNode({
      name: 'mint',
-     data: structTypeNode([/* fields copied from the shared type */]),
+     data: definedTypeLinkNode('mintState'),
  });
```
