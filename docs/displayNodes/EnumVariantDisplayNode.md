# EnumVariantDisplayNode

Display metadata for an enum variant: its label and whether to hide its inner payload.

## Attributes

### Data

| Attribute       | Type                       | Description                                                                                                                                                                   |
| --------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`          | `"enumVariantDisplayNode"` | The node discriminator.                                                                                                                                                       |
| `label`         | `string` _(optional)_      | An override label shown for the variant (e.g. `"Buy"`). When absent, renderers derive a label from the variant `name`.                                                        |
| `skipInnerData` | `boolean` _(optional)_     | When `true`, the variant's payload is hidden — only the label is rendered. Useful for tuple payloads that have no per-field handle, or when the payload is purely structural. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Relabelling a struct variant

```typescript
enumStructVariantTypeNode(
    'buy',
    structTypeNode([structFieldTypeNode({ name: 'amount', type: numberTypeNode('u64') })]),
    undefined,
    { display: enumVariantDisplayNode({ label: 'Buy' }) },
);
```

### Hiding a tuple payload so only the label is shown

```typescript
enumTupleVariantTypeNode(
    'increment',
    tupleTypeNode([numberTypeNode('u64')]),
    undefined,
    { display: enumVariantDisplayNode({ label: 'Increment', skipInnerData: true }) },
);
```
