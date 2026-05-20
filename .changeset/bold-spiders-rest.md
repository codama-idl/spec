---
'@codama/spec': minor
---

Revert the twelve vec-of-children attribute flips introduced in rc.5. In v1 these arrays stay required, matching their pre-rc.5 shape:

- `programNode.accounts`, `instructions`, `definedTypes`, `pdas`, `events`, `errors`, `constants`
- `rootNode.additionalPrograms`
- `instructionNode.accounts`, `arguments`
- `pdaNode.seeds`
- `pdaValueNode.seeds`

The optional encoding is deferred to a future spec major. Keeping these arrays required in v1 means existing codegen targets (JS, Rust) don't have to special-case the "empty array vs. absent" distinction mid-cycle, and consumers of the published types don't need to migrate every iteration over `program.instructions`, `instruction.accounts`, etc. to defensive `?? []`. The camelCase rename and the new `{ kind: 'address' }` `TypeExpr` from rc.5 are preserved.

Attributes whose emptiness already encodes structural meaning (`structTypeNode.fields`, `tupleTypeNode.items`, `enumTypeNode.variants`, value-side equivalents, `hiddenPrefixTypeNode.prefix`, `hiddenSuffixTypeNode.suffix`) were never touched by rc.5 and remain required.
