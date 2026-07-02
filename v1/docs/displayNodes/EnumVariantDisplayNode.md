# `EnumVariantDisplayNode`

Display metadata for an enum variant: its label and whether to hide its inner payload.

## Attributes

### Data

| Attribute       | Type                       | Description                                                                |
| --------------- | -------------------------- | -------------------------------------------------------------------------- |
| `kind`          | `"enumVariantDisplayNode"` | The node discriminator.                                                    |
| `label`         | `string` _(optional)_      | An override label shown for the variant (e.g. `"Buy"`).                    |
| `skipInnerData` | `boolean` _(optional)_     | When `true`, the variant's payload is hidden — only the label is rendered. |
