# Codama spec

The canonical Codama node specification.

Version 1.8.0

## Categories

- [ContextualValue](./contextualValueNodes/README.md) - Contextual-value nodes — references resolved at instruction-build time (account values, argument values, …).
- [Count](./countNodes/README.md) - Count nodes — strategies for sizing a homogeneous collection in serialized form.
- [Discriminator](./discriminatorNodes/README.md) - Discriminator nodes — strategies for distinguishing one account or instruction from another.
- [Display](./displayNodes/README.md) - Display nodes — presentation metadata attached to instructions, accounts, fields, and enum variants.
- [Link](./linkNodes/README.md) - Link nodes — references to other named entities (programs, PDAs, accounts, …).
- [PdaSeed](./pdaSeedNodes/README.md) - PDA-seed nodes — the constants and variables a program uses to derive PDAs.
- [Shared](./sharedNodes/README.md) - Shared enumerations referenced from multiple node categories.
- [Type](./typeNodes/README.md) - Type nodes — the building blocks of every value shape.
- [Value](./valueNodes/README.md) - Value nodes — concrete values whose shape is described by a type node.

## TopLevel

Top-level nodes and helper unions — the entry points of any Codama IDL.

- [AccountNode](./AccountNode.md) - An on-chain account: its name, data structure, optional fixed size, optional PDA, and optional discriminators.
- [ConstantNode](./ConstantNode.md) - A named constant exposed by the program: a typed value associated with a name.
- [DefinedTypeNode](./DefinedTypeNode.md) - A reusable named type that can be referenced by `definedTypeLinkNode` from elsewhere in the IDL.
- [ErrorNode](./ErrorNode.md) - A program error — a numeric code paired with a name and human-readable message.
- [EventNode](./EventNode.md) - A program event: its data shape and optional discriminators used to identify it on the wire.
- [InstructionAccountNode](./InstructionAccountNode.md) - An account participating in an instruction, with its name, signing/writability flags, and an optional default value.
- [InstructionArgumentNode](./InstructionArgumentNode.md) - A named argument of an instruction, with its type and an optional default value.
- [InstructionByteDeltaNode](./InstructionByteDeltaNode.md) - A byte-size delta applied when computing rent or buffer size — typically used by instructions that resize accounts.
- [InstructionNode](./InstructionNode.md) - A program instruction: its accounts, arguments, byte-delta hints, discriminators, optional status, and optional sub-instructions.
- [InstructionRemainingAccountsNode](./InstructionRemainingAccountsNode.md) - A "remaining accounts" slot in an instruction — a variable-length tail of accounts derived from a value.
- [InstructionStatusNode](./InstructionStatusNode.md) - The lifecycle stage of an instruction (draft, live, deprecated, archived) with an optional accompanying message.
- [PdaNode](./PdaNode.md) - A program-derived address: its name, optional program ID override, and the seeds used to derive it.
- [PluginNode](./PluginNode.md) - Attaches named, plugin-specific data to a node.
- [ProgramNode](./ProgramNode.md) - A Solana program: its identity, version, accounts, instructions, defined types, PDAs, events, errors, and constants.
- [ProvidedNode](./ProvidedNode.md) - Exposes a node under a name so consumers in the surrounding scope can resolve it by that key.
- [RootNode](./RootNode.md) - The root of a Codama IDL document.
- [InstructionByteDeltaValue](./InstructionByteDeltaValue.md) - The value forms accepted by an `instructionByteDeltaNode`.
- [InstructionRemainingAccountsValue](./InstructionRemainingAccountsValue.md) - The value forms accepted by an `instructionRemainingAccountsNode`.
