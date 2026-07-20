---
'@codama/spec': patch
---

Document the array serialisation convention: every array attribute is omitted when empty on write and defaults to `[]` when absent on read.

An absent array and an empty array are semantically identical — both mean "no items". Consumers MUST normalise an absent array to `[]`. This keeps encoded IDLs small (they are often uploaded on-chain) and makes adding or omitting an array attribute a non-breaking change. The `attribute` vs `optionalAttribute` distinction has no effect on how arrays serialise; it only documents intent and governs the optionality of non-array attributes.

This release is documentation-only: `v1/spec.json` and every published type are unchanged. It records the convention as a versioned contract for the TypeScript and Rust reference implementations to adopt.
