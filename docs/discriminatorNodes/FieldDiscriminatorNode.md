# FieldDiscriminatorNode

Identifies a node by the value of a named field at a known byte offset.

## Attributes

### Data

| Attribute | Type                       | Description                                                                                                           |
| --------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `kind`    | `"fieldDiscriminatorNode"` | The node discriminator.                                                                                               |
| `name`    | `CamelCaseString`          | The name of the discriminating field — a `structFieldTypeNode` of the account data or an argument of the instruction. |
| `offset`  | `u64`                      | The byte offset of the field.                                                                                         |

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
            name: 'discriminator',
            type: numberTypeNode('u32'),
            defaultValue: numberValueNode(42),
            defaultValueStrategy: 'omitted',
        }),
        // ...
    ]),
    discriminators: [fieldDiscriminatorNode('discriminator')],
    // ...
});
```

### An instruction distinguished by an 8-byte argument at offset 0

```typescript
instructionNode({
    arguments: [
        instructionArgumentNode({
            name: 'discriminator',
            type: fixedSizeTypeNode(bytesTypeNode(), 8),
            defaultValue: bytesValueNode('base16', '0011223344556677'),
            defaultValueStrategy: 'omitted',
        }),
        // ...
    ],
    discriminators: [fieldDiscriminatorNode('discriminator')],
    // ...
});
```
