# StringDisplayNode

Display metadata for a string value.
The string's wire encoding is carried by `stringTypeNode.encoding`; this node only addresses presentation.

## Attributes

### Data

| Attribute    | Type                  | Description                                                                                                                              |
| ------------ | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`       | `"stringDisplayNode"` | The node discriminator.                                                                                                                  |
| `sliceStart` | `u64` _(optional)_    | The start index of the displayed slice, inclusive. Defaults to the start of the string. Indices apply to the decoded character sequence. |
| `sliceEnd`   | `u64` _(optional)_    | The end index of the displayed slice, exclusive. Defaults to the end of the string. Indices apply to the decoded character sequence.     |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Displaying the whole string

```typescript
stringTypeNode('utf8', { display: stringDisplayNode({}) });

// "SOLANA" => "SOLANA"
```

### Displaying a leading slice

```typescript
stringTypeNode('utf8', { display: stringDisplayNode({ sliceStart: 0, sliceEnd: 3 }) });

// "SOLANA" => "SOL"
```
