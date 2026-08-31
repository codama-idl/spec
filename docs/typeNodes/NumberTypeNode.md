# NumberTypeNode

A numeric type with a fixed wire format and byte order.

## Attributes

### Data

| Attribute | Type               | Description             |
| --------- | ------------------ | ----------------------- |
| `kind`    | `"numberTypeNode"` | The node discriminator. |

### Children

| Attribute    | Type                                                                     | Description                                                                                                                           |
| ------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `format`     | [`NumberFormat`](../sharedNodes/NumberFormat.md)                         | The wire format used to serialise the number.                                                                                         |
| `endian`     | [`Endianness`](../sharedNodes/Endianness.md)                             | The byte order used to serialise the number.                                                                                          |
| `display`    | [`NumberDisplayNode`](../displayNodes/NumberDisplayNode.md) _(optional)_ | Display metadata describing how the number is presented.                                                                              |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_     | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                          |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                          | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Encoding `u32` integers

![Diagram](https://github.com/codama-idl/codama/assets/3642397/4bb1ae23-c69f-4c9f-a7ec-8f971d061667)

```typescript
numberTypeNode('u32');

// 5     => 0x05000000
// 42    => 0x2A000000
// 65535 => 0xFFFF0000
```

### Encoding `f32` big-endian decimal numbers

![Diagram](https://github.com/codama-idl/codama/assets/3642397/d9cbfd3c-b8a2-4c13-a8a8-a11e7ed5d422)

```typescript
numberTypeNode('f32', 'be');

// 1      => 0x3F800000
// -42    => 0xC2280000
// 3.1415 => 0x40490E56
```

### Encoding `shortU16` integers

![Diagram](https://github.com/codama-idl/codama/assets/3642397/73e12166-cdaa-4fca-ae2a-67937f8b130e)

```typescript
numberTypeNode('shortU16');

// 42    => 0x2A
// 128   => 0x8001
// 16384 => 0x808001
```
