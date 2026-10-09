# ValueLabelDisplayNode

A label presented instead of a specific value, e.g. `"All"` for an amount of `u64::MAX` or `"Never expires"` for an absent expiry.
Listed in a `structFieldDisplayNode`'s `valueLabels`; it is not part of any `display` slot on its own.

## Attributes

### Data

| Attribute | Type                      | Description             |
| --------- | ------------------------- | ----------------------- |
| `kind`    | `"valueLabelDisplayNode"` | The node discriminator. |

### Children

| Attribute | Type                                            | Description                                                                                                                                                                                                                                                                  |
| --------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`   | [`ValueNode`](../valueNodes/ValueNode.md)       | The value to label, matched structurally against the field's raw decoded value, before any display formatting, e.g. `integerValueNode('18446744073709551615')` or `noneValueNode()`. It must be a concrete value of the field's type: injected values are not resolved here. |
| `label`   | `string` \| [`TextNode`](../TextNode.md)        | The label presented instead of the value, both in the fallback list and in interpolated intents (e.g. `"all SOL"`). Since the same label serves both, prefer wording that reads well as a field value and mid-sentence.                                                      |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data.                                                                                                                                                                                                                              |

## Examples

### Labelling a sentinel amount

```typescript
structFieldTypeNode({
    identifier: 'amount',
    type: integerTypeNode('u64', {
        display: amountNumberDisplayNode({ decimals: injectedValueNode({ key: 'decimals' }) }),
    }),
    display: structFieldDisplayNode({
        label: 'Amount',
        valueLabels: [valueLabelDisplayNode({ value: integerValueNode('18446744073709551615'), label: 'All' })],
    }),
});

// u64::MAX => "All", any other amount => e.g. "1.5"
```

### Labelling an absent optional value

```typescript
structFieldTypeNode({
    identifier: 'amount',
    type: optionTypeNode(
        integerTypeNode('u64', {
            display: amountNumberDisplayNode({ decimals: integerValueNode('9'), unit: stringValueNode('SOL') }),
        }),
    ),
    display: structFieldDisplayNode({
        valueLabels: [valueLabelDisplayNode({ value: noneValueNode(), label: 'all SOL' })],
    }),
});

// None => "Unwrap all SOL from …", Some(1500000000) => "Unwrap 1.5 SOL from …"
```
