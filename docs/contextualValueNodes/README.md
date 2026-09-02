# ContextualValue

Contextual-value nodes — references resolved at instruction-build time (account values, data values, …).

## Nodes

- [`AccountBumpValueNode`](./AccountBumpValueNode.md) - Refers to the bump seed of a named PDA-derived account in the surrounding instruction.
- [`AccountDataValueNode`](./AccountDataValueNode.md) - Refers to a value within a named account's decoded data.
- [`AccountValueNode`](./AccountValueNode.md) - Refers to a named account in the surrounding instruction.
- [`ConditionalValueNode`](./ConditionalValueNode.md) - A branching contextual value.
- [`DataValueNode`](./DataValueNode.md) - Refers to a value within the data of the surrounding instruction.
- [`IdentityValueNode`](./IdentityValueNode.md) - Refers to the wallet identity providing the instruction context — the main wallet that should own things.
- [`PayerValueNode`](./PayerValueNode.md) - Refers to the wallet paying for the surrounding transaction — the main wallet that should pay for things, such as rent for account storage.
- [`PdaSeedValueNode`](./PdaSeedValueNode.md) - Pairs a PDA seed name with the value to substitute when deriving the PDA.
- [`PdaValueNode`](./PdaValueNode.md) - Resolves to a PDA derived from a list of seed values.
- [`ProgramIdValueNode`](./ProgramIdValueNode.md) - Refers to the program ID of the surrounding instruction — that is, the address of the `programNode` this node descends from.

## Unions

- [`ConditionalValueCondition`](./ConditionalValueCondition.md) - The condition forms accepted by a `conditionalValueNode`.
- [`ContextualValueNode`](./ContextualValueNode.md) - The composable form: any standalone contextual-value node.
- [`InstructionInputValueNode`](./InstructionInputValueNode.md) - Anything that can be used as the input value for an instruction account default or a conditional branch.
- [`PdaSeedValueValue`](./PdaSeedValueValue.md) - The value forms accepted by a `pdaSeedValueNode`.
- [`PdaValuePda`](./PdaValuePda.md) - A `pdaValueNode` may reference a PDA either by link or inline.
- [`PdaValueProgramId`](./PdaValueProgramId.md) - The program-id forms accepted by a `pdaValueNode`.
- [`RegisteredContextualValueNode`](./RegisteredContextualValueNode.md) - Every node tagged as a contextual-value node, including helper variants.
- [`StandaloneContextualValueNode`](./StandaloneContextualValueNode.md) - Every contextual-value node usable as a top-level value.
