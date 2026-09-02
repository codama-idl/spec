# FloatTypeNode

An IEEE-754 floating-point number with a fixed wire format and byte order.
Floating-point numbers are notoriously unsafe for financial values — prefer `fixedPointTypeNode` for those.

## Attributes

### Data

| Attribute | Type                  | Description                                                                                                                                               |
| --------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`    | `"floatTypeNode"`     | The node discriminator.                                                                                                                                   |
| `unit`    | `string` _(optional)_ | The unit of measure the float denotes — e.g. `"USD"`. Part of the value semantics: without it, consumers cannot know what quantity the number represents. |

### Children

| Attribute    | Type                                                                     | Description                                                                                                                                                                               |
| ------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `format`     | [`FloatFormat`](../sharedNodes/FloatFormat.md)                           | The wire format used to serialise the float.                                                                                                                                              |
| `endian`     | [`Endianness`](../sharedNodes/Endianness.md) _(optional)_                | The byte order used to serialise the float. Defaults to `le`.                                                                                                                             |
| `display`    | [`NumberDisplayNode`](../displayNodes/NumberDisplayNode.md) _(optional)_ | Display metadata describing how the float is presented. Typically only `unit` is meaningful for floats — a float already carries its own scale, so `decimals` is not a supported pattern. |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_     | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                                                                              |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                          | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                                     |

## Examples

### A little-endian f64

```typescript
const node = floatTypeNode('f64');

// 1.5 => 0x000000000000F83F
```

### A float denoting a quantity

```typescript
floatTypeNode('f64', { unit: 'USD' });
```
