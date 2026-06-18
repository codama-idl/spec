---
'@codama/spec': minor
---

Add a presentation layer to the spec covering how instructions, accounts, fields, enum variants, and individual values are displayed to a user.

A new `display` category introduces eight nodes. `instructionDisplayNode` carries a short `intent` label and an `interpolatedIntent` sentence template with `${root.path}` placeholders rooted at `data.` (instruction arguments) or `accounts.` (instruction accounts). `instructionAccountDisplayNode` and `structFieldDisplayNode` carry a `label` and a `skip` rule from a new `displaySkip` enumeration (`always` / `never` / `whenInjected`, the last variant gating visibility on whether the value was already surfaced elsewhere through the provide/inject graph). `structFieldDisplayNode` additionally carries flat `flatten` and `flattenPrefix` attributes that lift a nested struct into its parent's context. `enumVariantDisplayNode` carries a `label` and a `skipInnerData` toggle. Four value-presentation nodes describe how a number or string is rendered: `amountNumberDisplayNode` (`decimals` and `unit` slots), `dateTimeNumberDisplayNode` (a `ticksPerSecond` divisor that converts ticks back to seconds), `durationNumberDisplayNode` (the same divisor, marking the value as an elapsed span), and `stringDisplayNode` (flat `sliceStart`/`sliceEnd` indices over the decoded character sequence).

A provide/inject primitive lets reusable types pull contextual values without naming siblings. `providedNode` (a top-level node) exposes a node under a `name` so consumers in the surrounding scope can resolve it by that key; it sits inside the new `instructionNode.provides` list. `injectedValueNode` (a value node, valid anywhere a `valueNode` is) carries a `key` and an optional `fallback`, resolving against the surrounding provider graph. Two purpose unions, `injectableNumberValueNode` and `injectableStringValueNode`, type the slots on `amountNumberDisplayNode` so a literal value or an injected key are both accepted while the validator still rejects nonsense.

A new `accountFieldValueNode` (a contextual value) selects a field from a named account's decoded data; it relies on the new optional `instructionAccountNode.accountLink` to know the account's layout, including cross-program references via `accountLinkNode.program`.

The meta-model gains an `anyNode` `TypeExpr` for slots that carry an arbitrary node without enumerating each kind by hand (used by `providedNode.node`). Codegen targets map it to their top-level `Node` registry type.

Every host change is optional and additive: existing consumers and the generated wire format are untouched. `SPEC_VERSION` bumps to `1.7.0`.
