# Codama Spec

The canonical Codama node specification.

Spec version: 1.9.2 · Other majors: [v1](https://github.com/codama-idl/spec/blob/1.x/v1/docs/README.md)

Pages marked _(abstract)_ document unions: sets of nodes that can be used interchangeably.

## Base attributes

Attributes shared by every node.
Codegen targets append them after each node's declared attributes, so they always serialise last.

| Attribute | Type                                           | Description                                                                                                                           |
| --------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Constrained strings

Attribute tables reference these constrained string types:

- `IdentifierString` — a machine key: `[A-Za-z_][A-Za-z0-9_]*` (no leading digit). No casing is mandated, but identifiers sharing a scope (a sibling set of the same kind) must stay unique after lowercasing and stripping underscores, so renderer casing conversions never collide. References match identifiers by exact string comparison; the folding rule governs uniqueness only.
- `NamespaceString` — a chain of identifiers separated by single dots: `identifier ("." identifier)*` — e.g. `i18n.es`. A single identifier is a valid namespace. Used for plugin namespaces, which match by exact string comparison; the identifier folding rule does not apply.
- `PathString` — a path expression pointing into nested data: `first ( "." identifier | "[" integer "]" )*` where `first := identifier | "[" integer "]"` — e.g. `amount`, `fruits[0].banana`, or `[0].banana` against tuple-rooted data. `.identifier` accesses a struct field by exact identifier match (following links); `[n]` accesses the n-th item of an array, tuple or set, with non-negative indices. Each attribute carrying a path documents its anchor — the data the first segment resolves against; interpolated text templates embed the same expressions as `${root…}` placeholders, where the leading root names the anchor explicitly.
- `IntegerString` — a base-10 integer string: `-?[0-9]+` — e.g. `"42"` or `"-12048014319693667524"`. String storage keeps the full 64- and 128-bit ranges lossless through JSON transport, where a bare number would be corrupted to the nearest 64-bit float.
- `DecimalString` — a decimal number string: optional sign, digits, optional fraction and exponent — e.g. `"1.5"`, `"-0.25"`, `"6.02e23"` — or one of the specials `"NaN"`, `"Infinity"`, `"-Infinity"`. String storage makes float round-trips deterministic across serialisers.
- `SemverString` — a semver version string — e.g. `1.6.0`.

## Categories

- [ContextualValue](./contextualValueNodes/README.md) - Contextual-value nodes — references resolved at instruction-build time (account values, data values, …).
- [Count](./countNodes/README.md) - Count nodes — strategies for sizing a homogeneous collection in serialized form.
- [Discriminator](./discriminatorNodes/README.md) - Discriminator nodes — strategies for distinguishing one account or instruction from another.
- [Display](./displayNodes/README.md) - Display nodes — presentation metadata attached to instructions, accounts, fields, and enum variants.
- [Link](./linkNodes/README.md) - Link nodes — references to other named entities (programs, PDAs, accounts, …).
- [PdaSeed](./pdaSeedNodes/README.md) - PDA-seed nodes — the constants and variables a program uses to derive PDAs.
- [Shared](./sharedNodes/README.md) - Shared enumerations referenced from multiple node categories.
- [Transform](./transformNodes/README.md) - Transform nodes — modifiers applied to the serialisation of the type node that carries them.
- [Type](./typeNodes/README.md) - Type nodes — the building blocks of every value shape.
- [Value](./valueNodes/README.md) - Value nodes — concrete values whose shape is described by a type node.

## TopLevel

Top-level nodes and helper unions — the entry points of any Codama IDL.

- [`AccountNode`](./AccountNode.md) - An on-chain account: its identifier, data type, optional fixed size, optional PDA, and optional discriminators.
- [`ConstantNode`](./ConstantNode.md) - A named constant exposed by the program: a typed value associated with a name.
- [`DefinedTypeNode`](./DefinedTypeNode.md) - A reusable named type that can be referenced by `definedTypeLinkNode` from elsewhere in the IDL.
- [`ErrorNode`](./ErrorNode.md) - A program error — a numeric code paired with a name and human-readable message.
- [`EventNode`](./EventNode.md) - A program event: its data shape and optional discriminators used to identify it on the wire.
- [`InstructionAccountNode`](./InstructionAccountNode.md) - An account participating in an instruction, with its identifier, signing/writability flags, and an optional default value.
- [`InstructionByteDeltaNode`](./InstructionByteDeltaNode.md) - A byte-size delta applied when computing rent or buffer size — typically used by instructions that resize accounts.
- [`InstructionNode`](./InstructionNode.md) - A program instruction: its accounts, data, byte-delta hints, discriminators, optional status, and optional sub-instructions.
- [`InstructionRemainingAccountsNode`](./InstructionRemainingAccountsNode.md) - A "remaining accounts" slot in an instruction — a variable-length tail of accounts appended after the named account slots.
- [`InstructionStatusNode`](./InstructionStatusNode.md) - The lifecycle stage of an instruction (draft, live, deprecated, archived) with an optional accompanying message.
- [`PdaNode`](./PdaNode.md) - A program-derived address: its identifier, optional program ID override, and the seeds used to derive it.
- [`PluginNode`](./PluginNode.md) - Attaches namespaced, plugin-specific data to a node.
- [`ProgramNode`](./ProgramNode.md) - A Solana program: its identity, version, accounts, instructions, defined types, PDAs, events, errors, and constants.
- [`ProvidedNode`](./ProvidedNode.md) - Exposes a node under a key so consumers in the surrounding scope can resolve it.
- [`RootNode`](./RootNode.md) - The root of a Codama IDL.
- [`InstructionByteDeltaValue`](./InstructionByteDeltaValue.md) - The value forms accepted by an `instructionByteDeltaNode`.
