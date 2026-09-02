# Display

Display nodes — presentation metadata attached to instructions, accounts, fields, and enum variants.

## Nodes

- [`AmountNumberDisplayNode`](./AmountNumberDisplayNode.md) - Display metadata that presents an integer as a scaled amount with an optional unit, for quantities whose scale is contextual rather than static — e.g. a raw token amount whose decimals live in the mint account.
- [`EnumVariantDisplayNode`](./EnumVariantDisplayNode.md) - Display metadata for an enum variant: its label and whether to hide its inner payload.
- [`InstructionAccountDisplayNode`](./InstructionAccountDisplayNode.md) - Display metadata for an instruction account: its label in the fallback list and whether it is shown.
- [`InstructionDisplayNode`](./InstructionDisplayNode.md) - Display metadata for an instruction: a short intent label and an interpolated sentence template.
- [`StringDisplayNode`](./StringDisplayNode.md) - Display metadata for a string value.
- [`StructFieldDisplayNode`](./StructFieldDisplayNode.md) - Display metadata for a named member: its label, whether it is shown in the fallback list, and whether it is flattened into its parent.
- [`UnitNumberDisplayNode`](./UnitNumberDisplayNode.md) - Display metadata that labels a number with a contextually resolved unit, without any scaling.

## Unions

- [`DisplayNode`](./DisplayNode.md) - The composable form: any registered display node.
- [`NumberDisplayNode`](./NumberDisplayNode.md) - The presentation forms a number may take. Raw rendering is expressed by the absence of a display attribute.
- [`RegisteredDisplayNode`](./RegisteredDisplayNode.md) - Every node tagged as display metadata.
