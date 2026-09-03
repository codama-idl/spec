---
'@codama/spec': major
---

Give every node a `plugins` list via a new base-attribute mechanism. The meta-model's `Spec` type gains an optional `base` block (authored with the new `defineBase` helper) declaring attributes shared by every node; codegen targets append them after each node's declared attributes, so they always serialise last. The spec declares one base attribute — `plugins`, an optional array of `pluginNode` — making every node extensible with namespaced, consumer-defined data. `instructionNode` no longer declares `plugins` locally (the universal base attribute replaces it), and `validate` rejects base attributes that collide with declared attributes or carry unresolved references.
