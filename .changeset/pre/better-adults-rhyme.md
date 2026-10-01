---
'@codama/spec': major
---

Allow any value node as the payload of `enumValueNode`. Enum variants may carry data of any type, e.g. `enumVariantTypeNode('amount', { data: integerTypeNode('u64') })`, but `enumValueNode.value` only accepted struct or tuple values, so such variants could not be expressed as values. `enumValueNode.value` now accepts any `valueNode`, which must match the variant's `data` type.

```ts
enumValueNode('operation', 'amount', integerValueNode('42'));
```

**BREAKING CHANGES**

**`enumValuePayload` union removed.** It was only used by `enumValueNode.value`, which now references the `valueNode` union. Codegen targets and other spec consumers referencing `enumValuePayload` should use `valueNode` instead. Existing IDLs remain valid.
