# StructFieldDisplayNode

Display metadata for a named member: its label, whether it is shown in the fallback list, and whether it is flattened into its parent. Value presentation is carried by the member's type; this node only addresses naming and composition.

## Attributes

### Data

| Attribute       | Type                       | Description                                                                                                                                                          |
| --------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`          | `"structFieldDisplayNode"` | The node discriminator.                                                                                                                                              |
| `label`         | `string` _(optional)_      | An override label shown for the member (e.g. `"Amount"`).                                                                                                            |
| `flatten`       | `boolean` _(optional)_     | When `true`, the member's type is expected to be a struct and its fields are lifted into the parent's context, dropping the field name as an extra level of nesting. |
| `flattenPrefix` | `string` _(optional)_      | A literal prefix prepended to each flattened member's label (e.g. `"args."`).                                                                                        |

### Children

| Attribute | Type                                                        | Description                                                                             |
| --------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `skip`    | [`DisplaySkip`](../sharedNodes/DisplaySkip.md) _(optional)_ | Whether the member is shown in the fallback list. Defaults to `"never"` (always shown). |

## Examples

### Relabelling an instruction argument

```typescript
instructionArgumentNode({
    name: 'amount',
    type: numberTypeNode('u64'),
    display: structFieldDisplayNode({ label: 'Amount' }),
});
```

### Hiding a discriminator argument from the fallback list

```typescript
instructionArgumentNode({
    name: 'discriminator',
    type: numberTypeNode('u8'),
    display: structFieldDisplayNode({ skip: 'always' }),
});
```

### Flattening a nested struct into its parent with a label prefix

```typescript
structFieldTypeNode({
    name: 'config',
    type: definedTypeLinkNode('config'),
    display: structFieldDisplayNode({ flatten: true, flattenPrefix: 'config.' }),
});
```
