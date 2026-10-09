---
'@codama/spec': minor
---

Let display metadata label specific values. `structFieldDisplayNode` gains an optional `valueLabels` list of the new `valueLabelDisplayNode`s, each pairing a value with the label renderers present instead of it, in the fallback list and in interpolated intents alike. Values match the field's decoded value structurally, and the first matching label wins.

```ts
structFieldDisplayNode({
    label: 'Amount',
    valueLabels: [valueLabelDisplayNode({ value: integerValueNode('18446744073709551615'), label: 'All' })],
});
```
