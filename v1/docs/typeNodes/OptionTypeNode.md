# OptionTypeNode

A value that may be present or absent (Some/None), with an explicit numeric prefix indicating presence.

## Attributes

### Data

| Attribute | Type                   | Description                                                                                                                                                                               |
| --------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`    | `"optionTypeNode"`     | The node discriminator.                                                                                                                                                                   |
| `fixed`   | `boolean` _(optional)_ | When `true`, the absent variant still occupies the byte size of the present variant (zero-padded). Defaults to `false`. Must only be set to `true` when the `item` type is of fixed size. |

### Children

| Attribute | Type                                                                             | Description                                                                                                                                                                                    |
| --------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item`    | [`TypeNode`](./TypeNode.md)                                                      | The type carried by the option when present.                                                                                                                                                   |
| `prefix`  | [`NestedTypeNode`](./NestedTypeNode.md)<[`NumberTypeNode`](./NumberTypeNode.md)> | The numeric type used as the presence flag. A prefix value of `1` means the item is present and follows the prefix; a value of `0` means the item is absent and nothing further is serialised. |

## Examples

### An optional UTF-8 with a u16 prefix

```typescript
optionTypeNode(stringTypeNode('utf8'), { prefix: numberTypeNode('u16') });

// None          => 0x0000
// Some("Hello") => 0x010048656C6C6F
```

### A fixed optional u32 number

```typescript
optionTypeNode(numberTypeNode('u32'), { fixed: true });

// None     => 0x0000000000
// Some(42) => 0x012A000000
```
