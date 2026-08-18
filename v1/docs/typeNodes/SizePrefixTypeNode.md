# SizePrefixTypeNode

Wraps another type with a numeric prefix indicating the byte length of the wrapped type.
When decoding, the size is read first and determines how many bytes the wrapped type may consume.

## Attributes

### Data

| Attribute | Type                   | Description             |
| --------- | ---------------------- | ----------------------- |
| `kind`    | `"sizePrefixTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                                                             | Description                                                   |
| --------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `type`    | [`TypeNode`](./TypeNode.md)                                                      | The wrapped type whose serialisation is preceded by its size. |
| `prefix`  | [`NestedTypeNode`](./NestedTypeNode.md)<[`NumberTypeNode`](./NumberTypeNode.md)> | The numeric type used as the size prefix.                     |

## Examples

### A UTF-8 string prefixed with a u16 size

```typescript
sizePrefixTypeNode(stringTypeNode('utf8'), numberTypeNode('u16'));

// ""      => 0x0000
// "Hello" => 0x050048656C6C6F
```
