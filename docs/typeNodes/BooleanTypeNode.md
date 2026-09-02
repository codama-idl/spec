# BooleanTypeNode

A boolean serialised as an integer. The inner integer type determines the byte width.
A decoded number of `1` yields `true`; any other value yields `false`.

## Attributes

### Data

| Attribute | Type                | Description             |
| --------- | ------------------- | ----------------------- |
| `kind`    | `"booleanTypeNode"` | The node discriminator. |

### Children

| Attribute    | Type                                                                 | Description                                                                                                                           |
| ------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `size`       | [`IntegerTypeNode`](./IntegerTypeNode.md)                            | The integer type used to serialise the boolean.                                                                                       |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_ | Transforms applied to the serialisation of this type, in order — the first is the innermost.                                          |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                      | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### u8 booleans

```typescript
booleanTypeNode();

// true  => 0x01
// false => 0x00
```

### u32 booleans

```typescript
booleanTypeNode(integerTypeNode('u32'));

// true  => 0x01000000
// false => 0x00000000
```
