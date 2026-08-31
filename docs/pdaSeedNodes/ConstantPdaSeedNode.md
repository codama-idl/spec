# ConstantPdaSeedNode

A PDA seed with a constant value (e.g. a UTF-8 string or a fixed byte sequence).

## Attributes

### Data

| Attribute | Type                    | Description             |
| --------- | ----------------------- | ----------------------- |
| `kind`    | `"constantPdaSeedNode"` | The node discriminator. |

### Children

| Attribute | Type                                                | Description                                                                                                                           |
| --------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `type`    | [`TypeNode`](../typeNodes/TypeNode.md)              | The type of the seed value.                                                                                                           |
| `value`   | [`ConstantPdaSeedValue`](./ConstantPdaSeedValue.md) | The constant value to use as the seed — either a literal value or the program ID placeholder.                                         |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_     | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a constant PDA seed node from a type and a value

```typescript
const node = constantPdaSeedNode(numberTypeNode('u32'), numberValueNode(42));
```

### A PDA node with a UTF-8 constant seed

```typescript
pdaNode({
    name: 'tickets',
    seeds: [constantPdaSeedNodeFromString('utf8', 'tickets')],
});

// The seed above is equivalent to:
constantPdaSeedNode(stringTypeNode('utf8'), stringValueNode('tickets'));
```
