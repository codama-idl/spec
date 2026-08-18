---
"@codama/spec": patch
---

Enrich the node documentation with semantics that previously lived only in the hand-written codama-js docs: strategy walkthroughs with buffer diagrams for the pre/post offset type nodes (including corrected `preOffset` strategy semantics), serialisation caveats and defaults across instruction, type, value, count, and contextual-value nodes, the identity/payer distinction, and the original node diagrams. Documentation `docs` fields are now treated as markdown lines - codified by the new `Docs` type on `@codama/spec/api` - and attribute tables render every doc line instead of just the first.
