---
'@codama/spec': major
---

Replace the nested type wrappers with a flat `transforms` array. The seven wrapper type nodes (`fixedSizeTypeNode`, `sizePrefixTypeNode`, `preOffsetTypeNode`, `postOffsetTypeNode`, `sentinelTypeNode`, `hiddenPrefixTypeNode`, `hiddenSuffixTypeNode`) and the `nestedTypeNode` recursive alias are removed. Instead, a new `transform` category defines one transform node per former wrapper (same attributes minus the inner type), and every member of the `typeNode` union — links included — carries an optional `transforms` array, applied in order with the first transform innermost. A type's `kind` is now stable whether or not it is modified, and attributes that pinned a wrapped inner kind (`accountNode.data`, enum variant payloads, numeric prefixes) become plain node references.
