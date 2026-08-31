# FixedSizeTypeNode

Wraps another type and asserts a fixed total byte size. Padding or truncation is applied as needed.

## Attributes

### Data

| Attribute | Type                  | Description                                       |
| --------- | --------------------- | ------------------------------------------------- |
| `kind`    | `"fixedSizeTypeNode"` | The node discriminator.                           |
| `size`    | `u64`                 | The total byte size the wrapped type must occupy. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `type`    | [`TypeNode`](./TypeNode.md)                     | The wrapped type whose serialisation is constrained.                                                                                  |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a fixed size type node from a type node and a byte length

```typescript
const node = fixedSizeTypeNode(stringTypeNode('utf8'), 32);
```

### Fixed UTF-8 strings

```typescript
fixedSizeTypeNode(stringTypeNode('utf8'), 10);

// Hello => 0x48656C6C6F0000000000
```

### Fixed byte arrays

```typescript
fixedSizeTypeNode(bytesTypeNode(), 4);

// [1, 2]          => 0x01020000
// [1, 2, 3, 4, 5] => 0x01020304
```
