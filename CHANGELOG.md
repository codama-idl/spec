# @codama/spec

## 2.0.0-rc.0

### Major Changes

- [#137](https://github.com/codama-idl/spec/pull/137) [`dbeced1`](https://github.com/codama-idl/spec/commit/dbeced1ee4672dfa44dcc76138e2bb2e10c5ec72) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Allow any type node as account data. `accountNode.data` now accepts every member of the `typeNode` union — links included — aligning it with `eventNode.data`, so accounts can be non-structs or reuse a shared defined type via `definedTypeLinkNode`.
  
  **BREAKING CHANGES**
  
  **`accountNode.data` widens from `structTypeNode` to `typeNode`.** Consumers can no longer assume account data is a struct; nodes that reference account fields by name (`accountFieldValueNode`, `fieldDiscriminatorNode`, PDA seed defaults) are only valid when the data type resolves to a struct, following links — a constraint enforced by validators rather than by the spec shape.
  
  ```diff
    accountNode({
        name: 'mint',
  -     data: structTypeNode([/* fields copied from the shared type */]),
  +     data: definedTypeLinkNode('mintState'),
    });
  ```

- [#136](https://github.com/codama-idl/spec/pull/136) [`e6f9c63`](https://github.com/codama-idl/spec/commit/e6f9c63de4e06b67005aa1700dce1637065afb26) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Replace the nested type wrappers with a flat `transforms` array. The seven wrapper type nodes (`fixedSizeTypeNode`, `sizePrefixTypeNode`, `preOffsetTypeNode`, `postOffsetTypeNode`, `sentinelTypeNode`, `hiddenPrefixTypeNode`, `hiddenSuffixTypeNode`) and the `nestedTypeNode` recursive alias are removed. Instead, a new `transform` category defines one transform node per former wrapper (same attributes minus the inner type), and every member of the `typeNode` union — links included — carries an optional `transforms` array, applied in order with the first transform innermost. A type's `kind` is now stable whether or not it is modified, and attributes that pinned a wrapped inner kind (`accountNode.data`, enum variant payloads, numeric prefixes) become plain node references.

- [#138](https://github.com/codama-idl/spec/pull/138) [`996c20a`](https://github.com/codama-idl/spec/commit/996c20acbf7d4376beda23b02f3935e90e87020d) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Unify enum variants into a single `enumVariantTypeNode` with an optional `data` payload. The node also gains an optional `docs` attribute, closing the gap where enum variants could not carry documentation.
  
  **BREAKING CHANGES**
  
  **`enumEmptyVariantTypeNode`, `enumStructVariantTypeNode` and `enumTupleVariantTypeNode` are replaced by `enumVariantTypeNode`.** Absent `data` is a unit variant; a struct payload gives named fields, a tuple payload gives positional fields, and any other type node is carried as-is. The `name`, optional `discriminator` and optional `display` attributes carry over unchanged; the former `struct`/`tuple` attributes both become `data`. When upgrading, a v1 tuple variant holding exactly one item should unwrap to that single type — the 1-tuple was the workaround spelling of a single-type payload — **unless** the item is a `structTypeNode`, `tupleTypeNode` or `definedTypeLinkNode`: those shapes determine the variant flavour in `data` position, so unwrapping them would change the generated API (e.g. `V(InlineStruct)` becoming `V { … }`) even though the wire format is identical. Renderers whose target requires a wrapper (e.g. Rust) re-wrap single-type payloads on their side.
  
  ```diff
    enumTypeNode([
  -     enumEmptyVariantTypeNode('flip'),
  -     enumTupleVariantTypeNode('rotate', tupleTypeNode([numberTypeNode('u32')])),
  -     enumStructVariantTypeNode('move', structTypeNode([/* … */])),
  +     enumVariantTypeNode('flip'),
  +     enumVariantTypeNode('rotate', numberTypeNode('u32')),
  +     enumVariantTypeNode('move', structTypeNode([/* … */])),
    ]);
  ```
  
  **The `enumVariantTypeNode` union no longer exists.** The name now identifies the node itself; `enumTypeNode.variants` is an array of that node, and the `registeredTypeNode` union references it directly.

- [#139](https://github.com/codama-idl/spec/pull/139) [`ab4e253`](https://github.com/codama-idl/spec/commit/ab4e253b73b959df48cdb08eb09ff3b7bb4a3589) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Remove the `origin` attribute from `programNode` and the `programOrigin` enumeration. The attribute recorded which toolchain generated the description from a closed whitelist (`anchor`/`shank`) that cannot keep up with an open ecosystem, described provenance rather than the program itself, and went stale as IDLs were edited after generation.
  
  **BREAKING CHANGES**
  
  **`programNode.origin` and the `programOrigin` enumeration are removed.** Tools that need provenance metadata can attach it via the universal `plugins` list instead.
  
  ```diff
    programNode({
        name: 'myProgram',
  -     origin: 'anchor',
  +     plugins: [pluginNode('anchor')],
        // ...
    });
  ```

- [#140](https://github.com/codama-idl/spec/pull/140) [`1889d9f`](https://github.com/codama-idl/spec/commit/1889d9ff5b099f09cd3e440b646c33ae8e61e846) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Rename `name` to `identifier` on every named node and drop the camelCase mandate. Identifiers are constrained by charset only — `[A-Za-z_][A-Za-z0-9_]*` — so `transferTokens`, `transfer_tokens` and `TransferTokens` are all valid; renderers convert to their own casing conventions.
  
  **BREAKING CHANGES**
  
  **Every `name` attribute becomes `identifier`, except on `pluginNode` where it becomes `namespace`.** The rename makes the machine-key role explicit; a plugin's key is not an identifier but a dot-separated chain of identifiers (e.g. `i18n.es`), carried by the new `namespace` string constraint and named accordingly. No v2 node has a `name` attribute.
  
  ```diff
    {
        "kind": "instructionNode",
  -     "name": "transferTokens",
  +     "identifier": "transferTokens",
        // ...
    }
  ```
  
  **Casing is no longer part of the standard.** Instead of mandating camelCase, identifiers sharing a scope must remain unique after lowercasing and stripping underscores (`my_field` and `myField` cannot coexist), so renderers converting both to a target convention never collide. Every valid v1 camelCase name is already a valid v2 identifier.
  
  **The meta-model's `StringConstraint` gains `'namespace'`**, with a matching `stringNamespace()` authoring helper; the generated docs render the constraints as `IdentifierString` and `NamespaceString` (formerly `CamelCaseString`).

- [#145](https://github.com/codama-idl/spec/pull/145) [`9194314`](https://github.com/codama-idl/spec/commit/9194314e1c62e6acaecc7b96eaa3001125838d78) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Remove dead meta-model surface from the `@codama/spec/api` entrypoint. Under the one-major-per-line model, the API on a release line serves exactly its own spec content — machinery that nothing uses any more is dead code, not version-agnostic generosity. Anything needing v1 semantics obtains them from `@codama/spec@^1`.
  
  **BREAKING CHANGES**
  
  **The nested-union machinery is removed end to end.** `defineNestedUnion`, the `NestedUnionSpec` type, `CategorySpec.nestedUnions`, the `nestedUnion()` type-expression helper and its `TypeExpr` variant, the associated validation rules, and the docs generator's recursive-alias pages all go — the flat `transforms` design replaced recursive aliases, and encoded specs no longer carry empty `nestedUnions` arrays.
  
  **The float and tuple type expressions are removed.** `f32()`, `f64()`, `FloatWidth` and the `float` `TypeExpr` variant died with `numberValueNode` (attribute-level floats were a design we deliberately killed — data values are string-encoded); `tuple()` and the `tuple` variant, plus the `count()` semantic alias, had no remaining call sites. The integer width helpers stay intact as one coherent vocabulary.

- [#134](https://github.com/codama-idl/spec/pull/134) [`f14dd93`](https://github.com/codama-idl/spec/commit/f14dd9380c99c8d447571726049c84c27cf2876b) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Restructure the package for the one-major-per-line release model: the root entrypoint now hosts the current major's spec surface from `src/spec/` (formerly `src/v1/`), the `./v1` subpath export is removed (the v1 spec remains available as `@codama/spec@^1` from the `1.x` line), and the generated artifacts move from `v1/` to the repository root (`spec.json`, `schema.json`, `docs/`). The generated docs landing page now links to the docs of previous majors on their maintenance branches.

- [#135](https://github.com/codama-idl/spec/pull/135) [`f9cfe95`](https://github.com/codama-idl/spec/commit/f9cfe957deef47d58b6a38fdf3a95adfa35f4026) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Give every node a `plugins` list via a new base-attribute mechanism. The meta-model's `Spec` type gains an optional `base` block (authored with the new `defineBase` helper) declaring attributes shared by every node; codegen targets append them after each node's declared attributes, so they always serialise last. The spec declares one base attribute — `plugins`, an optional array of `pluginNode` — making every node extensible with namespaced, consumer-defined data. `instructionNode` no longer declares `plugins` locally (the universal base attribute replaces it), and `validate` rejects base attributes that collide with declared attributes or carry unresolved references.

- [#149](https://github.com/codama-idl/spec/pull/149) [`e0627db`](https://github.com/codama-idl/spec/commit/e0627dbdd4fefdfbdf0fc8b1cbd262d76f5eaece) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Canonicalise float value strings and document plugin conventions. Every `floatValueNode` value now has exactly one spelling, matching the existing `integerValueNode` guarantee, so structural comparison and deduplication stay exact across the ecosystem. The `pluginNode` docs gain two conventions: a namespace recommendation (prefix with a name you control; avoid `codama.*`, which may conflict with experimental Codama features in the future) and the consequences of payload opacity (payloads are inert data — never traversed, never validated, references inside them are not maintained by tree transformations — and plugins never change the meaning of the node they decorate, so unrecognised namespaces can be safely ignored).
  
  **BREAKING CHANGES**
  
  **Float value strings become canonical.** The `decimal` grammar narrows from the JSON number grammar to plain decimal notation: `-?(0|[1-9][0-9]*)("." [0-9]*[1-9])?` — no exponent form, no leading zeros, no trailing fraction zeros, no bare `.5`/`5.`, no `+` sign. The exact-case specials `"NaN"`, `"Infinity"` and `"-Infinity"` remain, and `"-0"` remains valid — a deliberate asymmetry with the integer grammar, since IEEE floats have signed zero.
  
  ```diff
  - { "kind": "floatValueNode", "value": "1.5e3" }
  + { "kind": "floatValueNode", "value": "1500" }
  
  - { "kind": "floatValueNode", "value": "0.0510" }
  + { "kind": "floatValueNode", "value": "0.051" }
  ```

- [#148](https://github.com/codama-idl/spec/pull/148) [`be337a8`](https://github.com/codama-idl/spec/commit/be337a83cdfd76417250e4031c28ec1267624f1a) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Introduce `textNode` and make every human-facing attribute text-shaped: the union `string | textNode`. A plain string is the common spelling; the `textNode` arm carries the same content plus `plugins`, so structured text metadata — e.g. translations under the `i18n.*` namespace convention — attaches without further spec changes. The tree always holds exactly what the JSON says: there is no normalisation between the two arms, and the canonical form of plugin-free text is the plain string (a plugin-free `textNode` is valid but non-canonical, flagged by validators as a lint).
  
  **BREAKING CHANGES**
  
  **Prose attributes become `string | textNode`.** `docs` (on every documented node), `errorNode.message`, `instructionStatusNode.message`, `instructionDisplayNode.intent`/`interpolatedIntent`, the display `label`s and `flattenPrefix` all carry the new `text`-shaped type expressions. Existing plain strings remain valid as-is — the rich arm is opt-in.
  
  ```jsonc
  // The common spelling — unchanged:
  "intent": "Transfer"
  
  // The rich arm, when metadata attaches:
  "intent": {
      "kind": "textNode",
      "content": "Transfer",
      "plugins": [{ "kind": "pluginNode", "namespace": "i18n.es", "payload": "Transferir" }]
  }
  ```
  
  **`docs` becomes a single text value.** The v1 array-of-lines encoding is replaced by one `string | textNode` value using `\n` for multiple lines; the `docs` type expression keeps its documentation-intent kind.
  
  ```diff
  - "docs": ["Transfers tokens.", "Fails when the account is frozen."]
  + "docs": "Transfers tokens.\nFails when the account is frozen."
  ```
  
  **Text attributes classify as children.** Their values may be `textNode`s carrying plugin nodes, so visitors traverse them like any other child — but they are the only children whose value may also be a primitive string, so traversal code must guard that arm.
  
  Multi-line text is a per-attribute convention (`docs` may be multi-line; intents, labels and messages are single-line), enforced as validator warnings. Identifiers are not text — they remain machine keys with their own rules, and `unit` stays a plain string: a quantity identifier, not prose.

- [#142](https://github.com/codama-idl/spec/pull/142) [`baf8510`](https://github.com/codama-idl/spec/commit/baf851066005b7fac443e8d1cb7b22a9bd985ec7) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Replace instruction arguments with a single `data` type node. Instructions now describe their serialised data exactly like accounts and events do — with one optional type node — and contextual defaults flow through the inject/provide pattern instead of argument-specific machinery. Renderer-specific resolution moves out of the standard and into namespaced plugins, so IDLs become statically checkable: every injection key must resolve in scope or carry a fallback.
  
  **BREAKING CHANGES**
  
  **`instructionNode.arguments` becomes `data?: TypeNode`; `instructionArgumentNode` is removed.** Arguments map to struct fields one-to-one; an absent `data` means the instruction serialises no data. Contextual defaults become provide/inject pairs: the field carries an `injectedValueNode` and the instruction's `provides` supplies the contextual value. Resolution is lexical (nearest enclosing `provides` wins) and self-contained (every key resolves in scope or has a `fallback`).
  
  ```diff
    instructionNode({
        identifier: 'createAccount',
  -     arguments: [
  -         instructionArgumentNode({
  +     data: structTypeNode([
  +         structFieldTypeNode({
                identifier: 'bump',
                type: numberTypeNode('u8'),
  -             defaultValue: accountBumpValueNode('newAccount'),
  +             defaultValue: injectedValueNode({ key: 'bump' }),
            }),
  -     ],
  +     ]),
  +     provides: [providedNode('bump', accountBumpValueNode('newAccount'))],
    });
  ```
  
  **`extraArguments` and `resolverValueNode` are removed.** Both were information gaps: the IDL claimed an input existed but could not say how to produce it. Renderer-specific resolution now rides on plugins attached to the node that owns the concern — refining a declared shape when one exists, or marking an honest absence when none does (an account default that only custom code can compute is simply an account with no `defaultValue` and a plugin).
  
  ```ts
  // v2: the identifier honestly declares a client input; renderers with a matching
  // plugin may fill it automatically, others expose it as a plain input.
  instructionRemainingAccountsNode('authorities', {
      isSigner: true,
      plugins: [
          pluginNode('codama.jsResolver', {
              payload: { function: 'resolveAuthorities', dependsOn: ['data.hasMultisig'] },
          }),
      ],
  });
  ```
  
  **`instructionRemainingAccountsNode` declares a named client input.** Its `value` union (`argumentValueNode | resolverValueNode`) is replaced by an `identifier` naming the account-list input exposed to callers — the same declaration model as `instructionAccountNode`; the `instructionRemainingAccountsValue` union is removed.
  
  **`instructionByteDeltaValue` and `conditionalValueCondition` lose their resolver members**, becoming `accountLinkNode | dataValueNode | numberValueNode` and `accountValueNode | dataValueNode` respectively; the `resolverDependency` union is removed with the node.
  
  **`argumentValueNode` becomes `dataValueNode` and `accountFieldValueNode` becomes `accountDataValueNode`.** With arguments gone as a concept, both names now describe what the nodes do: refer to a value at a path within anchored data — the instruction's own data and a named account's decoded data respectively. Attribute shapes are unchanged (`dataValueNode { path }`, `accountDataValueNode { account, path? }`).
  
  **`instructionArgumentLinkNode` is removed.** Link nodes point at nodes on the tree; with arguments now values inside a type node, reaching them is the job of path expressions, not links.

- [#105](https://github.com/codama-idl/spec/pull/105) [`ca0e36e`](https://github.com/codama-idl/spec/commit/ca0e36e87c879ad0f02a6c3df0f852a080068707) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Start Codama IDL v2. This is the beginning of the v2 line of the Codama standard; release candidates publish under the `rc` dist-tag while the spec evolves.

- [#141](https://github.com/codama-idl/spec/pull/141) [`9c38fda`](https://github.com/codama-idl/spec/commit/9c38fdac2c565c49d6d40a1f5394f75452ffc6da) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Introduce path expressions as the shared reference DSL. A path points into nested data with the grammar `first ( "." identifier | "[" integer "]" )*` where `first := identifier | "[" integer "]"` — e.g. `amount`, `config.fees[0]`, or `[0].banana` against tuple-rooted data — carried by the new `path` string constraint (`stringPath()` helper, rendered as `PathString`). Interpolated intent templates embed the same expressions as `${root…}` placeholders, so one grammar serves reference nodes and display interpolation alike. The generated docs root page gains a "Constrained strings" glossary defining `IdentifierString`, `NamespaceString`, `PathString` and `SemverString`.
  
  **BREAKING CHANGES**
  
  **Flat references become paths.** `argumentValueNode.name` (v1) becomes `argumentValueNode.path`, `fieldDiscriminatorNode.name` (v1) becomes `fieldDiscriminatorNode.path`, and `accountFieldValueNode.path` widens from a single field identifier to a path expression. Every v1 flat name is already a valid path, so values pass through unchanged.
  
  ```diff
  - argumentValueNode('amount')          // v1: a top-level argument name
  + argumentValueNode('amount')          // v2: same value, now a path…
  + argumentValueNode('config.fees[0]')  // …which can reach nested data
  ```
  
  **Interpolated intents are no longer flat-only.** `${data.…}` and `${accounts.…}` placeholders in `instructionDisplayNode.interpolatedIntent` accept the full path grammar after the root (e.g. `${data.config.fees[0]}`).

- [#144](https://github.com/codama-idl/spec/pull/144) [`7fe4f5b`](https://github.com/codama-idl/spec/commit/7fe4f5bf8e97b29f359a3586a0d29cef43a33637) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Rework the numeric system so every numeric fact lives in exactly one layer. Types split into pure numbers and quantities, values become string-encoded and therefore lossless, and time semantics move from the display layer to the type layer.
  
  **BREAKING CHANGES**
  
  **`numberTypeNode` splits into `integerTypeNode` and `floatTypeNode`.** Each carries its own format enumeration (`integerFormat` = `u8`–`u128`, `i8`–`i128`, `shortU16`; `floatFormat` = `f32`, `f64`), an `endian` that is now optional and defaults to `le` (byte-oriented formats such as `shortU16` ignore it), and an optional `unit` naming the quantity the number denotes. Every position that only makes sense as an integer — size and count prefixes, enum and boolean sizes, option prefixes, the backing number of quantity types — now references `integerTypeNode` by construction.
  
  ```diff
  - numberTypeNode('u64', 'le')
  + integerTypeNode('u64')
  - numberTypeNode('f64', 'le')
  + floatTypeNode('f64')
  ```
  
  **`numberValueNode` splits into string-encoded `integerValueNode` and `floatValueNode`.** Integer values are `IntegerString`s (`0|-?[1-9][0-9]*` — one spelling per integer), so the full 64- and 128-bit ranges survive JSON transport — a `u64` discriminator no longer corrupts at parse time. Float values are `DecimalString`s, making round-trips deterministic across serialisers. The `injectableNumberValueNode` union becomes `injectableIntegerValueNode`, and the byte-delta union's number member becomes `integerValueNode`.
  
  ```diff
  - numberValueNode(12048014319693667524)   // silently becomes 12048014319693668352
  + integerValueNode('12048014319693667524') // lossless — the quotes are load-bearing
  ```
  
  **`amountTypeNode` and `solAmountTypeNode` are replaced by `fixedPointTypeNode`.** A scaled quantity is `raw / base^scale`, with `scale` (non-zero), an optional `base` of `2` or `10` (default `10`, covering binary Q-format fractions), an optional `unit`, and an inner `integerTypeNode` that is a pure encoding slot (fixed-size formats only, no `unit` or `display` of its own). An unscaled quantity is an `integerTypeNode` with a `unit` — every meaning has exactly one spelling.
  
  ```diff
  - amountTypeNode(6, 'USDC', numberTypeNode('u64'))
  + fixedPointTypeNode(integerTypeNode('u64'), 6, { unit: 'USDC' })
  - solAmountTypeNode(numberTypeNode('u64'))
  + fixedPointTypeNode(integerTypeNode('u64'), 9, { unit: 'SOL' })
  - amountTypeNode(0, 'slots', numberTypeNode('u64'))
  + integerTypeNode('u64', { unit: 'slots' })
  ```
  
  **`dateTimeNumberDisplayNode` and `durationNumberDisplayNode` move to the type layer.** Their `ticksPerSecond` changes the moment or duration a value denotes — value semantics, not presentation. `dateTimeTypeNode` gains `ticksPerSecond` (default `1`) and a new `durationTypeNode` joins it; both wrap an `integerTypeNode` encoding slot. The contextual channel splits by capability: `amountNumberDisplayNode` (its `decimals` now required) scales integers whose decimals resolve at presentation time via injection (e.g. per-mint decimals), while the new `unitNumberDisplayNode` labels a number with a contextually resolved unit and no scaling — the only display form floats and fixed-points host, since a scaling display cannot apply to numbers whose scale is already fixed. When a resolved display value and a static type fact coexist, the resolved value wins for presentation and the type is the fallback.
  
  ```diff
  - numberTypeNode('i64', { display: dateTimeNumberDisplayNode(1000) })
  + dateTimeTypeNode(integerTypeNode('i64'), { ticksPerSecond: 1000 })
  - numberTypeNode('u32', { display: durationNumberDisplayNode() })
  + durationTypeNode(integerTypeNode('u32'))
  ```
  
  Attribute-level integers (`size`, `offset`, counts, `ticksPerSecond`) stay JSON numbers: they are bounded in practice, unlike program data values, which span the full 64/128-bit ranges. Supersedes the corruption analysis in [#97](https://github.com/codama-idl/spec/issues/97) — its string-`raw` essence ships here, with scaling moved to the type side where the value semantics live.

## 1.9.2

### Patch Changes

- [#91](https://github.com/codama-idl/spec/pull/91) [`ccafbc7`](https://github.com/codama-idl/spec/commit/ccafbc764b2f6d5dc66f3f88f72b0170f0825311) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Reword node and API documentation to say "IDL" instead of "document", matching the terminology used across Codama.

## 1.9.1

### Patch Changes

- [#81](https://github.com/codama-idl/spec/pull/81) [`c34d1b6`](https://github.com/codama-idl/spec/commit/c34d1b6b16252c9ec73e2c8b41f532f0be2d6dc6) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Enrich the node documentation with semantics that previously lived only in the hand-written codama-js docs: strategy walkthroughs with buffer diagrams for the pre/post offset type nodes (including corrected `preOffset` strategy semantics), serialisation caveats and defaults across instruction, type, value, count, and contextual-value nodes, the identity/payer distinction, and the original node diagrams. Documentation `docs` fields are now treated as markdown lines - codified by the new `Docs` type on `@codama/spec/api` - and attribute tables render every doc line instead of just the first.

## 1.9.0

### Minor Changes

- [#57](https://github.com/codama-idl/spec/pull/57) [`0cfb43b`](https://github.com/codama-idl/spec/commit/0cfb43b6a481b95e124a1c087c1a754aee2c2637) Thanks [@mikhd](https://github.com/mikhd)! - Generate markdown documentation for the spec under `v1/docs/`: one GitHub-browsable page per node, union, nested union, and enumeration, kept in lockstep with the spec source by CI. Nodes now also carry worked TypeScript examples, authored via the new `example` and `code` helpers on `@codama/spec/api`, embedded in `v1/spec.json`, and rendered into each node's documentation page.

### Patch Changes

- [#60](https://github.com/codama-idl/spec/pull/60) [`d288313`](https://github.com/codama-idl/spec/commit/d288313a73d5935beb21bb4850f73bfee5424d80) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Document the array serialisation convention: every array attribute is omitted when empty on write and defaults to `[]` when absent on read.

  An absent array and an empty array are semantically identical — both mean "no items". Consumers MUST normalise an absent array to `[]`. This keeps encoded IDLs small (they are often uploaded on-chain) and makes adding or omitting an array attribute a non-breaking change. The `attribute` vs `optionalAttribute` distinction has no effect on how arrays serialise; it only documents intent and governs the optionality of non-array attributes.

  This release is documentation-only: `v1/spec.json` and every published type are unchanged. It records the convention as a versioned contract for the TypeScript and Rust reference implementations to adopt.

## 1.8.0

### Minor Changes

- [#47](https://github.com/codama-idl/spec/pull/47) [`7cee272`](https://github.com/codama-idl/spec/commit/7cee2728613b6a9ee5080056b62f39d0e99b0074) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Add a `pluginNode` for attaching named, plugin-specific data to a node, and wire it into `instructionNode`.

  `pluginNode` (a top-level node) carries a `name` identifier and an optional `payload`. The payload holds arbitrary, consumer-defined data that only the matching plugin knows how to interpret; Codama treats it as opaque and carries it through the graph verbatim. Instructions gain an optional `instructionNode.plugins` list of `pluginNode`. Only `instructionNode` hosts plugins for now; future spec versions will extend plugin support to other nodes.

  To type the payload, the meta-model gains a `json` `TypeExpr` — an opaque, arbitrary JSON value whose shape is intentionally not described by the spec. Codegen targets emit their language's "any JSON" type (`unknown` in TypeScript, `serde_json::Value` in Rust).

  Every change is optional and additive: existing consumers and the generated wire format are untouched. `SPEC_VERSION` bumps to `1.8.0`.

## 1.7.0

### Minor Changes

- [#28](https://github.com/codama-idl/spec/pull/28) [`e3bd896`](https://github.com/codama-idl/spec/commit/e3bd896c7cab1febc9ef3258377baa66940486c9) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Add a presentation layer to the spec covering how instructions, accounts, fields, enum variants, and individual values are displayed to a user.

  A new `display` category introduces eight nodes. `instructionDisplayNode` carries a short `intent` label and an `interpolatedIntent` sentence template with `${root.path}` placeholders rooted at `data.` (instruction arguments) or `accounts.` (instruction accounts). `instructionAccountDisplayNode` and `structFieldDisplayNode` carry a `label` and a `skip` rule from a new `displaySkip` enumeration (`always` / `never` / `whenInjected`, the last variant gating visibility on whether the value was already surfaced elsewhere through the provide/inject graph). `structFieldDisplayNode` additionally carries flat `flatten` and `flattenPrefix` attributes that lift a nested struct into its parent's context. `enumVariantDisplayNode` carries a `label` and a `skipInnerData` toggle. Four value-presentation nodes describe how a number or string is rendered: `amountNumberDisplayNode` (`decimals` and `unit` slots), `dateTimeNumberDisplayNode` (a `ticksPerSecond` divisor that converts ticks back to seconds), `durationNumberDisplayNode` (the same divisor, marking the value as an elapsed span), and `stringDisplayNode` (flat `sliceStart`/`sliceEnd` indices over the decoded character sequence).

  A provide/inject primitive lets reusable types pull contextual values without naming siblings. `providedNode` (a top-level node) exposes a node under a `name` so consumers in the surrounding scope can resolve it by that key; it sits inside the new `instructionNode.provides` list. `injectedValueNode` (a value node, valid anywhere a `valueNode` is) carries a `key` and an optional `fallback`, resolving against the surrounding provider graph. Two purpose unions, `injectableNumberValueNode` and `injectableStringValueNode`, type the slots on `amountNumberDisplayNode` so a literal value or an injected key are both accepted while the validator still rejects nonsense.

  A new `accountFieldValueNode` (a contextual value) selects a field from a named account's decoded data; it relies on the new optional `instructionAccountNode.accountLink` to know the account's layout, including cross-program references via `accountLinkNode.program`.

  The meta-model gains an `anyNode` `TypeExpr` for slots that carry an arbitrary node without enumerating each kind by hand (used by `providedNode.node`). Codegen targets map it to their top-level `Node` registry type.

  Every host change is optional and additive: existing consumers and the generated wire format are untouched. `SPEC_VERSION` bumps to `1.7.0`.

## 1.7.0-rc.0

### Minor Changes

- [#28](https://github.com/codama-idl/spec/pull/28) [`e3bd896`](https://github.com/codama-idl/spec/commit/e3bd896c7cab1febc9ef3258377baa66940486c9) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Add a presentation layer to the spec covering how instructions, accounts, fields, enum variants, and individual values are displayed to a user.

  A new `display` category introduces eight nodes. `instructionDisplayNode` carries a short `intent` label and an `interpolatedIntent` sentence template with `${root.path}` placeholders rooted at `data.` (instruction arguments) or `accounts.` (instruction accounts). `instructionAccountDisplayNode` and `structFieldDisplayNode` carry a `label` and a `skip` rule from a new `displaySkip` enumeration (`always` / `never` / `whenInjected`, the last variant gating visibility on whether the value was already surfaced elsewhere through the provide/inject graph). `structFieldDisplayNode` additionally carries flat `flatten` and `flattenPrefix` attributes that lift a nested struct into its parent's context. `enumVariantDisplayNode` carries a `label` and a `skipInnerData` toggle. Four value-presentation nodes describe how a number or string is rendered: `amountNumberDisplayNode` (`decimals` and `unit` slots), `dateTimeNumberDisplayNode` (a `ticksPerSecond` divisor that converts ticks back to seconds), `durationNumberDisplayNode` (the same divisor, marking the value as an elapsed span), and `stringDisplayNode` (flat `sliceStart`/`sliceEnd` indices over the decoded character sequence).

  A provide/inject primitive lets reusable types pull contextual values without naming siblings. `providedNode` (a top-level node) exposes a node under a `name` so consumers in the surrounding scope can resolve it by that key; it sits inside the new `instructionNode.provides` list. `injectedValueNode` (a value node, valid anywhere a `valueNode` is) carries a `key` and an optional `fallback`, resolving against the surrounding provider graph. Two purpose unions, `injectableNumberValueNode` and `injectableStringValueNode`, type the slots on `amountNumberDisplayNode` so a literal value or an injected key are both accepted while the validator still rejects nonsense.

  A new `accountFieldValueNode` (a contextual value) selects a field from a named account's decoded data; it relies on the new optional `instructionAccountNode.accountLink` to know the account's layout, including cross-program references via `accountLinkNode.program`.

  The meta-model gains an `anyNode` `TypeExpr` for slots that carry an arbitrary node without enumerating each kind by hand (used by `providedNode.node`). Codegen targets map it to their top-level `Node` registry type.

  Every host change is optional and additive: existing consumers and the generated wire format are untouched. `SPEC_VERSION` bumps to `1.7.0`.

## 1.6.0

### Minor Changes

- [`4a46ebf`](https://github.com/codama-idl/spec/commit/4a46ebf6ef88d9e170e7174fcb104bd93fd389f3) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Add a `'docs'` `TypeExpr` kind for documentation arrays. The `docs()` semantic alias now returns `{ kind: 'docs' }` rather than desugaring to `array(string())`, preserving the documentation intent in the encoded spec. Each codegen target maps the new kind to the language's idiomatic documentation array type (e.g. `Array<string>` in TypeScript, `Vec<String>` in Rust).

  Expose the authoring API at the new `@codama/spec/api` subpath. Consumers building hand-authored specs (typically test fixtures or future tooling) can now import `defineNode`, `attribute`, `optionalAttribute`, primitives (`u32`, `string`, `boolean`, …), compounds (`array`, `tuple`), `defineUnion`, `defineEnumeration`, and `variant` directly. The default `@codama/spec` entrypoint continues to expose the latest version's spec data and types only.

  The `gen-ts-node-types` generator now emits arrays as `Array<T>` rather than `T[]`, so a literal-union element type (e.g. `array(literalUnion(true, 'either'))`) doesn't need extra parentheses to preserve precedence with `|`. The generator also collapses `literalUnion(true, false, …)` to `boolean | …` when both `true` and `false` are present — a TypeScript-only readability normalisation; the encoded spec keeps the explicit `true | false` representation so other codegen targets can still emit a multi-variant enum.

- [`70febc6`](https://github.com/codama-idl/spec/commit/70febc6f3ffbdad235c01d120e521fb2051aab16) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Reshape the spec meta-model into per-category groups, replace the top-level `nestedTypeNodeWrappers` list with a flexible `NestedUnionSpec` construct, and type all `docs?` fields as `readonly string[]`.

  `Spec` no longer carries flat `nodes`, `unions`, `enumerations`, and `nestedTypeNodeWrappers` lists. Instead, `Spec.categories: readonly CategorySpec[]` groups related entities together — each `CategorySpec` carries its own `nodes`, `unions`, `enumerations`, and `nestedUnions`. Category names are arbitrary strings; codegen targets pick how to honour them. The v1 spec uses `'type'`, `'value'`, `'link'`, `'pdaSeed'`, `'count'`, `'discriminator'`, `'contextualValue'`, `'shared'`, and `'topLevel'`.

  `NestedUnionSpec` replaces the implicit `nestedTypeNodeWrappers` list with an explicit, named recursive type alias. Each `NestedUnionSpec` carries a `name`, a `base: TypeExpr`, and a `wrappers: readonly string[]` list. The v1 spec declares one such alias (`NestedTypeNode`) under the `type` category. The `nestedTypeNode(name)` `TypeExpr` constructor is renamed to `nestedUnion(alias, innerKind)` to make the alias reference explicit, opening the door to further recursive families in future spec versions.

  All `docs?` fields on `AttributeSpec`, `NodeSpec`, `UnionSpec`, `EnumerationSpec`, `EnumerationVariantSpec`, `CategorySpec`, and `NestedUnionSpec` now take `readonly string[]` — one paragraph per array element. This brings the meta-model into alignment with the generated `Docs = Array<string>` shape and lets codegen targets render multi-paragraph documentation natively.

  New authoring helpers: `defineCategory(name, options)` and `defineNestedUnion(name, options)`. The `gen-ts-node-types` generator is updated to walk the new structure, renders one alias file per `NestedUnionSpec`, and maps each spec category to its TypeScript-monorepo subdirectory via a small renderer-side table.

- [`cb59ce7`](https://github.com/codama-idl/spec/commit/cb59ce770097319f5173f6bb5dd38751047bdff2) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Two spec changes that adjust the encoded shape:

  - **Identifier casing.** All spec identifiers are now camelCase. Enumerations, unions, and nested-union aliases that were PascalCase (`TypeNode`, `BytesEncoding`, `NestedTypeNode`, …) are renamed to camelCase (`typeNode`, `bytesEncoding`, `nestedTypeNode`, …). `validate.ts` now enforces camelCase on unions, enumerations, and nested unions alongside the existing node-kind check.

  - **New `address` type-expression kind.** A new primitive `{ kind: 'address' }` (plus an `address()` factory) replaces `string()` on attributes that hold a Solana address. Applied to `programNode.publicKey`, `publicKeyValueNode.publicKey`, and `pdaNode.programId`. Attribute names and node kinds are unchanged; only the type expression changes. Codegen targets can now render these as a dedicated address type (e.g. `Address` in Rust) rather than collapsing to a generic string.

- [#20](https://github.com/codama-idl/spec/pull/20) [`55d06e2`](https://github.com/codama-idl/spec/commit/55d06e29387f13d3b0aac0ab0781a43df6c4d3fc) Thanks [@lorisleiva](https://github.com/lorisleiva)! - First stable release of `@codama/spec`. The v1 spec shape settled across the `1.6.0-rc.*` line is now published as `1.6.0`. Reference implementations in [TypeScript](https://github.com/codama-idl/codama) and [Rust](https://github.com/codama-idl/codama-rs) consume this package to render their own node types, factories, visitors, and validators from a single source of truth. Future Codama majors will land alongside the `v1` entrypoint as `v2`, `v3`, …, with the default `@codama/spec` entrypoint tracking the latest stable.

### Patch Changes

- [`f345ba3`](https://github.com/codama-idl/spec/commit/f345ba3c7f6800e16c1afca8656edca8c8c7ece1) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Disable `splitting` in the tsup build config.

  Multi-entry ESM builds (`index` + `v1`) were causing tsup's automatic code splitting to lift shared modules into hashed `chunk-*.mjs` files. Those chunks were not listed in `package.json#files`, so the published tarball shipped entrypoints that re-exported from missing modules and ESM consumers failed at import time with `Cannot find module '...chunk-XXXXX.node.mjs'`. Disabling splitting makes each entry inline its dependencies and the published `dist/` self-contained.

## 1.6.0-rc.6

### Minor Changes

- [`a00aff0`](https://github.com/codama-idl/spec/commit/a00aff09e1479487fc6344b6ace4506830960df6) Thanks [@lorisleiva](https://github.com/lorisleiva)! - Revert the twelve vec-of-children attribute flips introduced in rc.5. In v1 these arrays stay required, matching their pre-rc.5 shape:

  - `programNode.accounts`, `instructions`, `definedTypes`, `pdas`, `events`, `errors`, `constants`
  - `rootNode.additionalPrograms`
  - `instructionNode.accounts`, `arguments`
  - `pdaNode.seeds`
  - `pdaValueNode.seeds`

  The optional encoding is deferred to a future spec major. Keeping these arrays required in v1 means existing codegen targets (JS, Rust) don't have to special-case the "empty array vs. absent" distinction mid-cycle, and consumers of the published types don't need to migrate every iteration over `program.instructions`, `instruction.accounts`, etc. to defensive `?? []`. The camelCase rename and the new `{ kind: 'address' }` `TypeExpr` from rc.5 are preserved.

  Attributes whose emptiness already encodes structural meaning (`structTypeNode.fields`, `tupleTypeNode.items`, `enumTypeNode.variants`, value-side equivalents, `hiddenPrefixTypeNode.prefix`, `hiddenSuffixTypeNode.suffix`) were never touched by rc.5 and remain required.

## 1.6.0-rc.5

### Minor Changes

- cb59ce7: Three spec changes that adjust the encoded shape:

  - **Identifier casing.** All spec identifiers are now camelCase. Enumerations, unions, and nested-union aliases that were PascalCase (`TypeNode`, `BytesEncoding`, `NestedTypeNode`, …) are renamed to camelCase (`typeNode`, `bytesEncoding`, `nestedTypeNode`, …). `validate.ts` now enforces camelCase on unions, enumerations, and nested unions alongside the existing node-kind check.

  - **New `address` type-expression kind.** A new primitive `{ kind: 'address' }` (plus an `address()` factory) replaces `string()` on attributes that hold a Solana address. Applied to `programNode.publicKey`, `publicKeyValueNode.publicKey`, and `pdaNode.programId`. Attribute names and node kinds are unchanged; only the type expression changes. Codegen targets can now render these as a dedicated address type (e.g. `Address` in Rust) rather than collapsing to a generic string.

  - **Empty arrays omitted from the wire (where semantically equivalent to absent).** Array-of-child attributes flip to optional on nodes where an empty array carries no meaning beyond "no children of this kind": `programNode`'s seven child arrays (`accounts`, `instructions`, `definedTypes`, `pdas`, `events`, `errors`, `constants`), `rootNode.additionalPrograms`, `instructionNode.accounts` and `arguments`, `pdaNode.seeds`, and `pdaValueNode.seeds`. Attributes whose emptiness encodes structural meaning (`structTypeNode.fields`, `tupleTypeNode.items`, `enumTypeNode.variants`, value-side equivalents, `hiddenPrefixTypeNode.prefix`, `hiddenSuffixTypeNode.suffix`) remain required.

## 1.6.0-rc.4

### Minor Changes

- 70febc6: Reshape the spec meta-model into per-category groups, replace the top-level `nestedTypeNodeWrappers` list with a flexible `NestedUnionSpec` construct, and type all `docs?` fields as `readonly string[]`.

  `Spec` no longer carries flat `nodes`, `unions`, `enumerations`, and `nestedTypeNodeWrappers` lists. Instead, `Spec.categories: readonly CategorySpec[]` groups related entities together — each `CategorySpec` carries its own `nodes`, `unions`, `enumerations`, and `nestedUnions`. Category names are arbitrary strings; codegen targets pick how to honour them. The v1 spec uses `'type'`, `'value'`, `'link'`, `'pdaSeed'`, `'count'`, `'discriminator'`, `'contextualValue'`, `'shared'`, and `'topLevel'`.

  `NestedUnionSpec` replaces the implicit `nestedTypeNodeWrappers` list with an explicit, named recursive type alias. Each `NestedUnionSpec` carries a `name`, a `base: TypeExpr`, and a `wrappers: readonly string[]` list. The v1 spec declares one such alias (`NestedTypeNode`) under the `type` category. The `nestedTypeNode(name)` `TypeExpr` constructor is renamed to `nestedUnion(alias, innerKind)` to make the alias reference explicit, opening the door to further recursive families in future spec versions.

  All `docs?` fields on `AttributeSpec`, `NodeSpec`, `UnionSpec`, `EnumerationSpec`, `EnumerationVariantSpec`, `CategorySpec`, and `NestedUnionSpec` now take `readonly string[]` — one paragraph per array element. This brings the meta-model into alignment with the generated `Docs = Array<string>` shape and lets codegen targets render multi-paragraph documentation natively.

  New authoring helpers: `defineCategory(name, options)` and `defineNestedUnion(name, options)`. The `gen-ts-node-types` generator is updated to walk the new structure, renders one alias file per `NestedUnionSpec`, and maps each spec category to its TypeScript-monorepo subdirectory via a small renderer-side table.

## 1.6.0-rc.3

### Minor Changes

- 4a46ebf: Add a `'docs'` `TypeExpr` kind for documentation arrays. The `docs()` semantic alias now returns `{ kind: 'docs' }` rather than desugaring to `array(string())`, preserving the documentation intent in the encoded spec. Each codegen target maps the new kind to the language's idiomatic documentation array type (e.g. `Array<string>` in TypeScript, `Vec<String>` in Rust).

  Expose the authoring API at the new `@codama/spec/api` subpath. Consumers building hand-authored specs (typically test fixtures or future tooling) can now import `defineNode`, `attribute`, `optionalAttribute`, primitives (`u32`, `string`, `boolean`, …), compounds (`array`, `tuple`), `defineUnion`, `defineEnumeration`, and `variant` directly. The default `@codama/spec` entrypoint continues to expose the latest version's spec data and types only.

  The `gen-ts-node-types` generator now emits arrays as `Array<T>` rather than `T[]`, so a literal-union element type (e.g. `array(literalUnion(true, 'either'))`) doesn't need extra parentheses to preserve precedence with `|`. The generator also collapses `literalUnion(true, false, …)` to `boolean | …` when both `true` and `false` are present — a TypeScript-only readability normalisation; the encoded spec keeps the explicit `true | false` representation so other codegen targets can still emit a multi-variant enum.

## 1.6.0-rc.2

### Patch Changes

- f345ba3: Disable `splitting` in the tsup build config.

  Multi-entry ESM builds (`index` + `v1`) were causing tsup's automatic code splitting to lift shared modules into hashed `chunk-*.mjs` files. Those chunks were not listed in `package.json#files`, so the published tarball shipped entrypoints that re-exported from missing modules and ESM consumers failed at import time with `Cannot find module '...chunk-XXXXX.node.mjs'`. Disabling splitting makes each entry inline its dependencies and the published `dist/` self-contained.

## 1.6.0-rc.1

### Patch Changes

- d963306: Verify the end-to-end changeset → OIDC trusted publishing flow by cutting `1.6.0-rc.1`. No code changes; this release only exists to confirm that `changesets/action` can publish via npm trusted publishing without a long-lived `NPM_TOKEN` in CI.
