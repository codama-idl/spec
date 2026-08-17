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

## Examples

### Create a constant discriminator node from a constant value and an optional offset

```typescript
const node = constantDiscriminatorNode(constantValueNode(stringTypeNode('utf8'), stringValueNode('Hello')), 64);
```

### An account distinguished by a u32 number equal to 42 at offset 0

```typescript
accountNode({
    discriminators: [constantDiscriminatorNode(constantValueNode(numberTypeNode('u32'), numberValueNode(42)))],
    // ...
});
```

### An instruction distinguished by an 8-byte hash at offset 0

```typescript
instructionNode({
    discriminators: [
        constantDiscriminatorNode(constantValueNode(bytesTypeNode(), bytesValueNode('base16', '0011223344556677'))),
    ],
    // ...
});
```
