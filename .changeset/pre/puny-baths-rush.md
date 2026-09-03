---
'@codama/spec': major
---

Canonicalise float value strings and document plugin conventions. Every `floatValueNode` value now has exactly one spelling, matching the existing `integerValueNode` guarantee, so structural comparison and deduplication stay exact across the ecosystem. The `pluginNode` docs gain two conventions: a namespace recommendation (prefix with a name you control; avoid `codama.*`, which may conflict with experimental Codama features in the future) and the consequences of payload opacity (payloads are inert data — never traversed, never validated, references inside them are not maintained by tree transformations — and plugins never change the meaning of the node they decorate, so unrecognised namespaces can be safely ignored).

**BREAKING CHANGES**

**Float value strings become canonical.** The `decimal` grammar narrows from the JSON number grammar to plain decimal notation: `-?(0|[1-9][0-9]*)("." [0-9]*[1-9])?` — no exponent form, no leading zeros, no trailing fraction zeros, no bare `.5`/`5.`, no `+` sign. The exact-case specials `"NaN"`, `"Infinity"` and `"-Infinity"` remain, and `"-0"` remains valid — a deliberate asymmetry with the integer grammar, since IEEE floats have signed zero.

```diff
- { "kind": "floatValueNode", "value": "1.5e3" }
+ { "kind": "floatValueNode", "value": "1500" }

- { "kind": "floatValueNode", "value": "0.0510" }
+ { "kind": "floatValueNode", "value": "0.051" }
```
