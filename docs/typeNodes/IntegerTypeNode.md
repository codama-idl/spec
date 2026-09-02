# IntegerTypeNode

An integer with a fixed wire format and byte order.

## Attributes

### Data

| Attribute | Type                  | Description                                                                                                                                                                                                                       |
| --------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`    | `"integerTypeNode"`   | The node discriminator.                                                                                                                                                                                                           |
| `unit`    | `string` _(optional)_ | The unit of measure the integer denotes — e.g. `"slots"` or `"bps"`. Part of the value semantics: without it, consumers cannot know what quantity the number represents. For scaled quantities, use `fixedPointTypeNode` instead. |

### Children

| Attribute    | Type                                                                     | Description                                                                                                                           |
| ------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `format`     | [`IntegerFormat`](../sharedNodes/IntegerFormat.md)                       | The wire format used to serialise the integer.                                                                                        |
| `endian`     | [`Endianness`](../sharedNodes/Endianness.md) _(optional)_                | The byte order used to serialise the integer. Defaults to `le`; byte-oriented formats such as `shortU16` ignore it.                   |
| `display`    | [`NumberDisplayNode`](../displayNodes/NumberDisplayNode.md) _(optional)_ | Display metadata describing how the integer is presented.                                                                             |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_     | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                          |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                          | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A little-endian u64

```typescript
const node = integerTypeNode('u64');

// 42 => 0x2A00000000000000
```

### A big-endian i32

```typescript
integerTypeNode('i32', { endian: 'be' });

// -42 => 0xFFFFFFD6
```

### An integer denoting a quantity

```typescript
integerTypeNode('u64', { unit: 'slots' });
```

### A Solana compact-u16

```typescript
integerTypeNode('shortU16');

// 42    => 0x2A
// 26742 => 0xF6D0
```
