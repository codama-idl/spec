# HiddenSuffixTypeNode

Suffixes another type with a list of constant values that are written and read but not surfaced as fields to consumers.
When decoding, the suffixed constants are consumed and checked against their expected values before being discarded.

## Attributes

### Data

| Attribute | Type                     | Description             |
| --------- | ------------------------ | ----------------------- |
| `kind`    | `"hiddenSuffixTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                                        | Description                                                            |
| --------- | ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| `type`    | [`TypeNode`](./TypeNode.md)                                 | The wrapped type whose serialisation is followed by the hidden suffix. |
| `suffix`  | [`ConstantValueNode`](../valueNodes/ConstantValueNode.md)[] | The constant values written after the wrapped type, in order.          |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a hidden suffix type node from a type node and constant value nodes

```typescript
const node = hiddenSuffixTypeNode(numberTypeNode('u32'), [
    constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ffff')),
]);
```

### A number suffixed with 0xFFFF

```typescript
hiddenSuffixTypeNode(numberTypeNode('u32'), [constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ffff'))]);

// 42 => 0x2A000000FFFF
```

### A fixed UTF-8 string suffixed with "Hello"

```typescript
hiddenSuffixTypeNode(fixedSizeTypeNode(stringTypeNode('utf8'), 10), [
    constantValueNode(stringTypeNode('utf8'), stringValueNode('Hello')),
]);

// World => 0x576F726C64000000000048656c6c6F
```
