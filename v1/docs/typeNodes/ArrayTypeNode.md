# `ArrayTypeNode`

A homogeneous list of items. The item type is defined by `item`; the length is determined by the `count` strategy.

## Attributes

### Data

| Attribute | Type              | Description             |
| --------- | ----------------- | ----------------------- |
| `kind`    | `"arrayTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                      | Description                                         |
| --------- | ----------------------------------------- | --------------------------------------------------- |
| `item`    | [`TypeNode`](./TypeNode.md)               | The type of each item in the array.                 |
| `count`   | [`CountNode`](../countNodes/CountNode.md) | The strategy used to determine the number of items. |
