# Link

Link nodes — references to other named entities (programs, PDAs, accounts, …).

## Nodes

- [`AccountLinkNode`](./AccountLinkNode.md) - A reference to an account defined elsewhere — possibly in a different program.
- [`DefinedTypeLinkNode`](./DefinedTypeLinkNode.md) - A reference to a defined type — possibly in a different program.
- [`InstructionAccountLinkNode`](./InstructionAccountLinkNode.md) - A reference to an account of another instruction.
- [`InstructionArgumentLinkNode`](./InstructionArgumentLinkNode.md) - A reference to an argument of another instruction.
- [`InstructionLinkNode`](./InstructionLinkNode.md) - A reference to an instruction defined elsewhere — possibly in a different program.
- [`PdaLinkNode`](./PdaLinkNode.md) - A reference to a PDA defined elsewhere — possibly in a different program.
- [`ProgramLinkNode`](./ProgramLinkNode.md) - A reference to a program by name.

## Unions

- [`LinkNode`](./LinkNode.md) - The composable form: any registered link node.
- [`RegisteredLinkNode`](./RegisteredLinkNode.md) - Every node tagged as a link to another part of the IDL.
