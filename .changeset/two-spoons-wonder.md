---
"@codama/spec": minor
---

Generate markdown documentation for the spec under `v1/docs/`: one GitHub-browsable page per node, union, nested union, and enumeration, kept in lockstep with the spec source by CI. Nodes now also carry worked TypeScript examples, authored via the new `example` and `code` helpers on `@codama/spec/api`, embedded in `v1/spec.json`, and rendered into each node's documentation page.
