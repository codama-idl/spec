# HiddenPrefixTransformNode

Prefixes the transformed type with a list of constant values that are written and read but not surfaced as fields to consumers.
When decoding, the prefixed constants are consumed and checked against their expected values before being discarded.

## Attributes

### Data

| Attribute | Type                          | Description             |
| --------- | ----------------------------- | ----------------------- |
| `kind`    | `"hiddenPrefixTransformNode"` | The node discriminator. |

### Children

| Attribute | Type                                                        | Description                                                                                                                           |
| --------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`  | [`ConstantValueNode`](../valueNodes/ConstantValueNode.md)[] | The constant values written before the transformed type, in order.                                                                    |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_             | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A number prefixed with 0xFFFF

```typescript
integerTypeNode('u32', {
    transforms: [hiddenPrefixTransformNode([constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ffff'))])],
});

// 42 => 0xFFFF2A000000
```

### A fixed UTF-8 string prefixed with "Hello"

```typescript
stringTypeNode('utf8', {
    transforms: [
        fixedSizeTransformNode(10),
        hiddenPrefixTransformNode([constantValueNode(stringTypeNode('utf8'), stringValueNode('Hello'))]),
    ],
});

// World => 0x48656C6C6F576F726C640000000000
```
