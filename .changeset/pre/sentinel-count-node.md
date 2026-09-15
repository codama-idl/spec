---
'@codama/spec': minor
---

Add `sentinelCountNode`, a count strategy that ends a collection when the bytes at the next item position match a constant sentinel, compared at item boundaries only. A new `sentinelCountStrategy` enumeration (`required`, `optional`, `omitted`) controls whether the sentinel is written when encoding and required when decoding.
