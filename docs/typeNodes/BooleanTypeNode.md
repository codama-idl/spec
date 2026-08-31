# BooleanTypeNode

A boolean serialised as a numeric value. The wrapped number type determines the byte width.
A decoded number of `1` yields `true`; any other value yields `false`.

## Attributes

### Data

| Attribute | Type                | Description             |
| --------- | ------------------- | ----------------------- |
| `kind`    | `"booleanTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                                                             | Description                                     |
| --------- | -------------------------------------------------------------------------------- | ----------------------------------------------- |
| `size`    | [`NestedTypeNode`](./NestedTypeNode.md)<[`NumberTypeNode`](./NumberTypeNode.md)> | The numeric type used to serialise the boolean. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### u8 booleans

```typescript
booleanTypeNode();

// true  => 0x01
// false => 0x00
```

### u32 booleans

```typescript
booleanTypeNode(numberTypeNode('u32'));

// true  => 0x01000000
// false => 0x00000000
```
