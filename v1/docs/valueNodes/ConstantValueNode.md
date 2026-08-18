# ConstantValueNode

A typed constant: a type node paired with a concrete value node.

## Attributes

### Data

| Attribute | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| `kind`    | `"constantValueNode"` | The node discriminator. |

### Children

| Attribute | Type                                   | Description                         |
| --------- | -------------------------------------- | ----------------------------------- |
| `type`    | [`TypeNode`](../typeNodes/TypeNode.md) | The type of the constant.           |
| `value`   | [`ValueNode`](./ValueNode.md)          | The concrete value of the constant. |

## Examples

### Create a constant value node from a type and a value node

```typescript
const node = constantValueNode(numberTypeNode('u32'), numberValueNode(42));
```

### A UTF-8 string constant

```typescript
constantValueNodeFromString('utf8', 'Hello');

// Equivalent to:
constantValueNode(stringTypeNode('utf8'), stringValueNode('Hello'));
```

### A base16 bytes constant

```typescript
constantValueNodeFromBytes('base16', 'FF99CC');

// Equivalent to:
constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'FF99CC'));
```
