# `StringDisplayNode`

Display metadata for a string value. The string's wire encoding is carried by `stringTypeNode.encoding`; this node only addresses presentation.

## Attributes

### Data

| Attribute    | Type                  | Description                                                                             |
| ------------ | --------------------- | --------------------------------------------------------------------------------------- |
| `kind`       | `"stringDisplayNode"` | The node discriminator.                                                                 |
| `sliceStart` | `u64` _(optional)_    | The start index of the displayed slice, inclusive. Defaults to the start of the string. |
| `sliceEnd`   | `u64` _(optional)_    | The end index of the displayed slice, exclusive. Defaults to the end of the string.     |
