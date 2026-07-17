# ConstantDiscriminatorNode

Identifies a node by a constant value at a known byte offset (e.g. a magic header).

## Attributes

### Data

| Attribute | Type                          | Description                                   |
| --------- | ----------------------------- | --------------------------------------------- |
| `kind`    | `"constantDiscriminatorNode"` | The node discriminator.                       |
| `offset`  | `u64`                         | The byte offset at which the constant begins. |

### Children

| Attribute  | Type                                                      | Description                                |
| ---------- | --------------------------------------------------------- | ------------------------------------------ |
| `constant` | [`ConstantValueNode`](../valueNodes/ConstantValueNode.md) | The constant value expected at the offset. |
