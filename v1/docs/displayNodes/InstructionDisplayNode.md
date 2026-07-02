# `InstructionDisplayNode`

Display metadata for an instruction: a short intent label and an interpolated sentence template. Either form may be absent; presentation strategy is left to the renderer.

## Attributes

### Data

| Attribute            | Type                       | Description                                                                                    |
| -------------------- | -------------------------- | ---------------------------------------------------------------------------------------------- |
| `kind`               | `"instructionDisplayNode"` | The node discriminator.                                                                        |
| `intent`             | `string` _(optional)_      | A short imperative label describing what the instruction does (e.g. `"Transfer"`).             |
| `interpolatedIntent` | `string` _(optional)_      | A sentence template that composes the instruction into prose with `${root.path}` placeholders. |
