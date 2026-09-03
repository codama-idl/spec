# StructFieldDisplayNode

Display metadata for a named member: its label, whether it is shown in the fallback list, and whether it is flattened into its parent.
Value presentation is carried by the member's type; this node only addresses naming and composition.

## Attributes

### Data

| Attribute | Type                       | Description                                                                                                                                                                                                                                                                                                                                                                                          |
| --------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`    | `"structFieldDisplayNode"` | The node discriminator.                                                                                                                                                                                                                                                                                                                                                                              |
| `flatten` | `boolean` _(optional)_     | When `true`, the member's type is expected to be a struct and its fields are lifted into the parent's context, dropping the field name as an extra level of nesting. Flattening lives on the field rather than on the struct so the same struct can be flattened in one place and nested in another. Meaningful only when the member's type is structurally a struct; renderers ignore it otherwise. |

### Children

| Attribute       | Type                                                        | Description                                                                                                                                                                               |
| --------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`         | `string` \| [`TextNode`](../TextNode.md) _(optional)_       | An override label shown for the member (e.g. `"Amount"`). When absent, renderers derive a label from the member `name`.                                                                   |
| `skip`          | [`DisplaySkip`](../sharedNodes/DisplaySkip.md) _(optional)_ | Whether the member is shown in the fallback list. Defaults to `"never"` (always shown).                                                                                                   |
| `flattenPrefix` | `string` \| [`TextNode`](../TextNode.md) _(optional)_       | A literal prefix prepended to each flattened member's label (e.g. `"args."`). Meaningful only when `flatten` is `true`. Useful to disambiguate when two flattened children might collide. |
| `plugins`       | [`PluginNode`](../PluginNode.md)[] _(optional)_             | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                                     |

## Examples

### Relabelling an instruction data field

```typescript
structFieldTypeNode({
    identifier: 'amount',
    type: integerTypeNode('u64'),
    display: structFieldDisplayNode({ label: 'Amount' }),
});
```

### Hiding a discriminator field from the fallback list

```typescript
structFieldTypeNode({
    identifier: 'discriminator',
    type: integerTypeNode('u8'),
    display: structFieldDisplayNode({ skip: 'always' }),
});
```

### Flattening a nested struct into its parent with a label prefix

```typescript
structFieldTypeNode({
    identifier: 'config',
    type: definedTypeLinkNode('config'),
    display: structFieldDisplayNode({ flatten: true, flattenPrefix: 'config.' }),
});
```
