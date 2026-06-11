---
'@codama/spec': minor
---

Two spec changes that adjust the encoded shape:

- **Identifier casing.** All spec identifiers are now camelCase. Enumerations, unions, and nested-union aliases that were PascalCase (`TypeNode`, `BytesEncoding`, `NestedTypeNode`, …) are renamed to camelCase (`typeNode`, `bytesEncoding`, `nestedTypeNode`, …). `validate.ts` now enforces camelCase on unions, enumerations, and nested unions alongside the existing node-kind check.

- **New `address` type-expression kind.** A new primitive `{ kind: 'address' }` (plus an `address()` factory) replaces `string()` on attributes that hold a Solana address. Applied to `programNode.publicKey`, `publicKeyValueNode.publicKey`, and `pdaNode.programId`. Attribute names and node kinds are unchanged; only the type expression changes. Codegen targets can now render these as a dedicated address type (e.g. `Address` in Rust) rather than collapsing to a generic string.
