# TupleTypeNode

A heterogeneous fixed-length sequence in which each positional slot has its own type.

## Attributes

### Data

| Attribute | Type              | Description             |
| --------- | ----------------- | ----------------------- |
| `kind`    | `"tupleTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                          | Description                                 |
| --------- | ----------------------------- | ------------------------------------------- |
| `items`   | [`TypeNode`](./TypeNode.md)[] | The type of each positional slot, in order. |

## Examples

### A tuple storing a person's name and age

```typescript
tupleTypeNode([fixedSizeTypeNode(stringTypeNode('utf8'), 10), numberTypeNode('u8')]);

// (Alice, 42) => 0x416C69636500000000002A
```
