# FixedCountNode

A count strategy that fixes the number of items at a constant value.
This enables nodes such as `arrayTypeNode` to represent collections of a fixed length.

## Attributes

### Data

| Attribute | Type               | Description                |
| --------- | ------------------ | -------------------------- |
| `kind`    | `"fixedCountNode"` | The node discriminator.    |
| `value`   | `u64`              | The fixed number of items. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a fixed count node from a number

```typescript
const node = fixedCountNode(42);
```

### An array of three public keys

```typescript
arrayTypeNode(publicKeyTypeNode(), fixedCountNode(3));
```
