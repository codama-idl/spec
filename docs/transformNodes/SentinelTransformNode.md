# SentinelTransformNode

Delimits the transformed type with a constant sentinel value written immediately after it.

When decoding, the transformed type is decoded until the sentinel value is encountered, at which point decoding stops and the sentinel is discarded.

> [!IMPORTANT]
> For this transform to work, the sentinel value must never occur within the encoded bytes of the transformed type.

## Attributes

### Data

| Attribute | Type                      | Description             |
| --------- | ------------------------- | ----------------------- |
| `kind`    | `"sentinelTransformNode"` | The node discriminator. |

### Children

| Attribute  | Type                                                      | Description                                                                                                                           |
| ---------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `sentinel` | [`ConstantValueNode`](../valueNodes/ConstantValueNode.md) | The constant value written immediately after the transformed type to mark its end.                                                    |
| `plugins`  | [`PluginNode`](../PluginNode.md)[] _(optional)_           | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A UTF-8 string terminated by 0xFF

```typescript
stringTypeNode('utf8', {
    transforms: [sentinelTransformNode(constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ff')))],
});

// Hello => 0x48656C6C6FFF
```
