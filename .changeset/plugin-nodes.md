---
'@codama/spec': minor
---

Add a `pluginNode` for attaching named, plugin-specific data to a node, and wire it into `instructionNode`.

`pluginNode` (a top-level node) carries a `name` identifier and an optional `payload`. The payload holds arbitrary, consumer-defined data that only the matching plugin knows how to interpret; Codama treats it as opaque and carries it through the graph verbatim. Instructions gain an optional `instructionNode.plugins` list of `pluginNode`. Only `instructionNode` hosts plugins for now; future spec versions will extend plugin support to other nodes.

To type the payload, the meta-model gains a `json` `TypeExpr` — an opaque, arbitrary JSON value whose shape is intentionally not described by the spec. Codegen targets emit their language's "any JSON" type (`unknown` in TypeScript, `serde_json::Value` in Rust).

Every change is optional and additive: existing consumers and the generated wire format are untouched. `SPEC_VERSION` bumps to `1.8.0`.
