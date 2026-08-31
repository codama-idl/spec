# EventNode

A program event: its data shape and optional discriminators used to identify it on the wire.

## Attributes

### Data

| Attribute | Type                    | Description                           |
| --------- | ----------------------- | ------------------------------------- |
| `kind`    | `"eventNode"`           | The node discriminator.               |
| `name`    | `CamelCaseString`       | The name of the event.                |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the event. |

### Children

| Attribute        | Type                                                                            | Description                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `data`           | [`TypeNode`](./typeNodes/TypeNode.md)                                           | The type describing the event payload.                                                                                  |
| `discriminators` | [`DiscriminatorNode`](./discriminatorNodes/DiscriminatorNode.md)[] _(optional)_ | Discriminators that distinguish this event from others. When multiple are listed, they are combined with a logical AND. |

### Base

| Attribute | Type                                           | Description                                                                                                                                                     |
| --------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### An event with a struct payload

```typescript
eventNode({
    name: 'transferEvent',
    data: structTypeNode([
        structFieldTypeNode({ name: 'authority', type: publicKeyTypeNode() }),
        structFieldTypeNode({ name: 'amount', type: numberTypeNode('u64') }),
    ]),
});
```

### An event with a hidden prefix discriminator

```typescript
eventNode({
    name: 'transferEvent',
    data: hiddenPrefixTypeNode(structTypeNode([structFieldTypeNode({ name: 'amount', type: numberTypeNode('u64') })]), [
        constantValueNode(fixedSizeTypeNode(bytesTypeNode(), 8), bytesValueNode('base16', '0102030405060708')),
    ]),
    discriminators: [
        constantDiscriminatorNode(
            constantValueNode(fixedSizeTypeNode(bytesTypeNode(), 8), bytesValueNode('base16', '0102030405060708')),
        ),
    ],
});
```
