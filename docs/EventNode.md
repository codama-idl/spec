# EventNode

A program event: its data shape and optional discriminators used to identify it on the wire.

## Attributes

### Data

| Attribute    | Type                    | Description                           |
| ------------ | ----------------------- | ------------------------------------- |
| `kind`       | `"eventNode"`           | The node discriminator.               |
| `identifier` | `IdentifierString`      | The identifier of the event.          |
| `docs`       | `string[]` _(optional)_ | Markdown documentation for the event. |

### Children

| Attribute        | Type                                                                            | Description                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `data`           | [`TypeNode`](./typeNodes/TypeNode.md)                                           | The type describing the event payload.                                                                                                |
| `discriminators` | [`DiscriminatorNode`](./discriminatorNodes/DiscriminatorNode.md)[] _(optional)_ | Discriminators that distinguish this event from others. When multiple are listed, they are combined with a logical AND.               |
| `plugins`        | [`PluginNode`](./PluginNode.md)[] _(optional)_                                  | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### An event with a struct payload

```typescript
eventNode({
    identifier: 'transferEvent',
    data: structTypeNode([
        structFieldTypeNode({ identifier: 'authority', type: publicKeyTypeNode() }),
        structFieldTypeNode({ identifier: 'amount', type: numberTypeNode('u64') }),
    ]),
});
```

### An event with a hidden prefix discriminator

```typescript
eventNode({
    identifier: 'transferEvent',
    data: structTypeNode([structFieldTypeNode({ identifier: 'amount', type: numberTypeNode('u64') })], {
        transforms: [
            hiddenPrefixTransformNode([
                constantValueNode(bytesTypeNode({ transforms: [fixedSizeTransformNode(8)] }), bytesValueNode('base16', '0102030405060708')),
            ]),
        ],
    }),
    discriminators: [
        constantDiscriminatorNode(
            constantValueNode(bytesTypeNode({ transforms: [fixedSizeTransformNode(8)] }), bytesValueNode('base16', '0102030405060708')),
        ),
    ],
});
```
