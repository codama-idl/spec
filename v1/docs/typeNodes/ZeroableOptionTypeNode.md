# ZeroableOptionTypeNode

An optional value whose absence is signalled by a designated zero value rather than a presence flag.

## Attributes

### Data

| Attribute | Type                       | Description             |
| --------- | -------------------------- | ----------------------- |
| `kind`    | `"zeroableOptionTypeNode"` | The node discriminator. |

### Children

| Attribute   | Type                                                                   | Description                                                                                                |
| ----------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `item`      | [`TypeNode`](./TypeNode.md)                                            | The type carried by the option when present.                                                               |
| `zeroValue` | [`ConstantValueNode`](../valueNodes/ConstantValueNode.md) _(optional)_ | The constant value that signals absence. When omitted, the all-zero byte pattern of the item type is used. |

## Examples

### a u32 zeroable option

```typescript
zeroableOptionTypeNode(numberTypeNode('u32'));

// None     => 0x00000000
// Some(42) => 0x2A000000
```

### a u32 zeroable option with a custom zero value

```typescript
zeroableOptionTypeNode(numberTypeNode('u32'), constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ffffffff')));

// None     => 0xFFFFFFFF
// Some(42) => 0x2A000000
```
