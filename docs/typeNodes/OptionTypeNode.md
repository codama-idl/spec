# OptionTypeNode

A value that may be present or absent (Some/None), with an explicit numeric prefix indicating presence.

## Attributes

### Data

| Attribute | Type                   | Description                                                                                                                                                                               |
| --------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`    | `"optionTypeNode"`     | The node discriminator.                                                                                                                                                                   |
| `fixed`   | `boolean` _(optional)_ | When `true`, the absent variant still occupies the byte size of the present variant (zero-padded). Defaults to `false`. Must only be set to `true` when the `item` type is of fixed size. |

### Children

| Attribute    | Type                                                                 | Description                                                                                                                                                                                    |
| ------------ | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item`       | [`TypeNode`](./TypeNode.md)                                          | The type carried by the option when present.                                                                                                                                                   |
| `prefix`     | [`IntegerTypeNode`](./IntegerTypeNode.md)                            | The integer type used as the presence flag. A prefix value of `1` means the item is present and follows the prefix; a value of `0` means the item is absent and nothing further is serialised. |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_ | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                                                                                   |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                      | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                                          |

## Examples

### An optional UTF-8 with a u16 prefix

```typescript
optionTypeNode(stringTypeNode('utf8'), { prefix: integerTypeNode('u16') });

// None          => 0x0000
// Some("Hello") => 0x010048656C6C6F
```

### A fixed optional u32 number

```typescript
optionTypeNode(integerTypeNode('u32'), { fixed: true });

// None     => 0x0000000000
// Some(42) => 0x012A000000
```
