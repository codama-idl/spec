# ArrayTypeNode

A homogeneous list of items. The item type is defined by `item`; the length is determined by the `count` strategy.

## Attributes

### Data

| Attribute | Type              | Description             |
| --------- | ----------------- | ----------------------- |
| `kind`    | `"arrayTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `item`    | [`TypeNode`](./TypeNode.md)                     | The type of each item in the array.                                                                                                   |
| `count`   | [`CountNode`](../countNodes/CountNode.md)       | The strategy used to determine the number of items.                                                                                   |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an array type node from a type node and a count node

```typescript
const node = arrayTypeNode(publicKeyTypeNode(), prefixedCountNode(numberTypeNode('u32')));
```

### u32 prefixed array of u8 numbers

![Diagram](https://github.com/codama-idl/codama/assets/3642397/1bbd3ecb-e06a-42fa-94a7-74c9302286e6)

```typescript
arrayTypeNode(numberTypeNode('u8'), prefixedCountNode(numberTypeNode('u32')));

// [1, 2, 3] => 0x03000000010203
```
