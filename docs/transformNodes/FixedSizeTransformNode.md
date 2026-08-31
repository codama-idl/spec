# FixedSizeTransformNode

Asserts a fixed total byte size for the transformed type. Padding or truncation is applied as needed.

## Attributes

### Data

| Attribute | Type                       | Description                                           |
| --------- | -------------------------- | ----------------------------------------------------- |
| `kind`    | `"fixedSizeTransformNode"` | The node discriminator.                               |
| `size`    | `u64`                      | The total byte size the transformed type must occupy. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Fixed UTF-8 strings

```typescript
stringTypeNode('utf8', { transforms: [fixedSizeTransformNode(10)] });

// Hello => 0x48656C6C6F0000000000
```

### Fixed byte arrays

```typescript
bytesTypeNode({ transforms: [fixedSizeTransformNode(4)] });

// [1, 2]          => 0x01020000
// [1, 2, 3, 4, 5] => 0x01020304
```
