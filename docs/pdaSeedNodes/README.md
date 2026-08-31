# PdaSeed

PDA-seed nodes — the constants and variables a program uses to derive PDAs.

## Nodes

- [`ConstantPdaSeedNode`](./ConstantPdaSeedNode.md) - A PDA seed with a constant value (e.g. a UTF-8 string or a fixed byte sequence).
- [`VariablePdaSeedNode`](./VariablePdaSeedNode.md) - A PDA seed whose value is provided at derivation time, identified by name.

## Unions

- [`ConstantPdaSeedValue`](./ConstantPdaSeedValue.md) - The value forms a `constantPdaSeedNode` may carry — either a literal value or the program ID placeholder.
- [`PdaSeedNode`](./PdaSeedNode.md) - The composable form: any registered PDA seed node.
- [`RegisteredPdaSeedNode`](./RegisteredPdaSeedNode.md) - Every node tagged as a PDA seed.
