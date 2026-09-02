# FieldDiscriminatorNode

Identifies a node by the value of a field at a known byte offset.

## Attributes

### Data

| Attribute | Type                       | Description                                                                                                                                                                                                          |
| --------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`    | `"fieldDiscriminatorNode"` | The node discriminator.                                                                                                                                                                                              |
| `path`    | `PathString`               | The path to the discriminating field, relative to the account or instruction data — e.g. `discriminator` or `header.kind`. Field segments are only valid where the data type resolves to a struct (following links). |
| `offset`  | `u64`                      | The byte offset of the field.                                                                                                                                                                                        |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a field discriminator node from a field name and an optional offset

```typescript
const node = fieldDiscriminatorNode('accountState', 64);
```

### An account distinguished by a u32 field at offset 0

```typescript
accountNode({
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'discriminator',
            type: integerTypeNode('u32'),
            defaultValue: integerValueNode('42'),
            defaultValueStrategy: 'omitted',
        }),
        // ...
    ]),
    discriminators: [fieldDiscriminatorNode('discriminator')],
    // ...
});
```

### An instruction distinguished by an 8-byte data field at offset 0

```typescript
instructionNode({
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'discriminator',
            type: bytesTypeNode({ transforms: [fixedSizeTransformNode(8)] }),
            defaultValue: bytesValueNode('base16', '0011223344556677'),
            defaultValueStrategy: 'omitted',
        }),
        // ...
    ]),
    discriminators: [fieldDiscriminatorNode('discriminator')],
    // ...
});
```
