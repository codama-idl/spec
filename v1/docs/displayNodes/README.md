# Display

Display nodes — presentation metadata attached to instructions, accounts, fields, and enum variants.

## Nodes

- [`AmountNumberDisplayNode`](./AmountNumberDisplayNode.md) - Display metadata that presents a number as a scaled amount with an optional unit.
- [`DateTimeNumberDisplayNode`](./DateTimeNumberDisplayNode.md) - Display metadata that presents a number as a point in time.
- [`DurationNumberDisplayNode`](./DurationNumberDisplayNode.md) - Display metadata that presents a number as an elapsed duration.
- [`EnumVariantDisplayNode`](./EnumVariantDisplayNode.md) - Display metadata for an enum variant: its label and whether to hide its inner payload.
- [`InstructionAccountDisplayNode`](./InstructionAccountDisplayNode.md) - Display metadata for an instruction account: its label in the fallback list and whether it is shown.
- [`InstructionDisplayNode`](./InstructionDisplayNode.md) - Display metadata for an instruction: a short intent label and an interpolated sentence template.
- [`StringDisplayNode`](./StringDisplayNode.md) - Display metadata for a string value.
- [`StructFieldDisplayNode`](./StructFieldDisplayNode.md) - Display metadata for a named member: its label, whether it is shown in the fallback list, and whether it is flattened into its parent.

## Unions

- [`DisplayNode`](./DisplayNode.md) - The composable form: any registered display node.
- [`NumberDisplayNode`](./NumberDisplayNode.md) - The presentation forms a number may take. Raw rendering is expressed by the absence of a display attribute.
- [`RegisteredDisplayNode`](./RegisteredDisplayNode.md) - Every node tagged as display metadata.
