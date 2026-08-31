# HiddenSuffixTransformNode

Suffixes the transformed type with a list of constant values that are written and read but not surfaced as fields to consumers.
When decoding, the suffixed constants are consumed and checked against their expected values before being discarded.

## Attributes

### Data

| Attribute | Type                          | Description             |
| --------- | ----------------------------- | ----------------------- |
| `kind`    | `"hiddenSuffixTransformNode"` | The node discriminator. |

### Children

| Attribute | Type                                                        | Description                                                                                                                           |
| --------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `suffix`  | [`ConstantValueNode`](../valueNodes/ConstantValueNode.md)[] | The constant values written after the transformed type, in order.                                                                     |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_             | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A number suffixed with 0xFFFF

```typescript
numberTypeNode('u32', {
    transforms: [hiddenSuffixTransformNode([constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ffff'))])],
});

// 42 => 0x2A000000FFFF
```

### A fixed UTF-8 string suffixed with "Hello"

```typescript
stringTypeNode('utf8', {
    transforms: [
        fixedSizeTransformNode(10),
        hiddenSuffixTransformNode([constantValueNode(stringTypeNode('utf8'), stringValueNode('Hello'))]),
    ],
});

// World => 0x576F726C64000000000048656c6c6F
```
