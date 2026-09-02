# SizePrefixTransformNode

Precedes the transformed type with a numeric prefix indicating its byte length.
When decoding, the size is read first and determines how many bytes the transformed type may consume.

## Attributes

### Data

| Attribute | Type                        | Description             |
| --------- | --------------------------- | ----------------------- |
| `kind`    | `"sizePrefixTransformNode"` | The node discriminator. |

### Children

| Attribute | Type                                                 | Description                                                                                                                           |
| --------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`  | [`IntegerTypeNode`](../typeNodes/IntegerTypeNode.md) | The integer type used as the size prefix.                                                                                             |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_      | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A UTF-8 string prefixed with a u16 size

```typescript
stringTypeNode('utf8', { transforms: [sizePrefixTransformNode(integerTypeNode('u16'))] });

// ""      => 0x0000
// "Hello" => 0x050048656C6C6F
```
