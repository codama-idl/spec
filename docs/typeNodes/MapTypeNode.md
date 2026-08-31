# MapTypeNode

A keyed map.
The key and value types are described by their respective type nodes; the entry count is determined by a count strategy.
Entries are serialised one after the other, each key immediately followed by its value — e.g. key A, value A, key B, value B.

## Attributes

### Data

| Attribute | Type            | Description             |
| --------- | --------------- | ----------------------- |
| `kind`    | `"mapTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                      | Description                                           |
| --------- | ----------------------------------------- | ----------------------------------------------------- |
| `key`     | [`TypeNode`](./TypeNode.md)               | The type of each entry key.                           |
| `value`   | [`TypeNode`](./TypeNode.md)               | The type of each entry value.                         |
| `count`   | [`CountNode`](../countNodes/CountNode.md) | The strategy used to determine the number of entries. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a map type node from a key type, a value type, and a count node

```typescript
const node = mapTypeNode(publicKeyTypeNode(), numberTypeNode('u32'), prefixedCountNode(numberTypeNode('u32')));
```

### A histogram that counts letters

```typescript
mapTypeNode(
    fixedSizeTypeNode(stringTypeNode('utf8'), 1), // Key: Single UTF-8 character.
    numberTypeNode('u16'), // Value: 16-bit unsigned integer.
    prefixedCountNode(numberTypeNode('u8')), // Count: map length is prefixed with a u8.
);

// { A: 42, B: 1, C: 16 } => 0x03412A00420100431000
```
