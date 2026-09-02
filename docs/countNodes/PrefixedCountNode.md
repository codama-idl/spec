# PrefixedCountNode

A count strategy where the number of items is read from a numeric prefix.
This enables nodes such as `arrayTypeNode` to represent collections whose length is stored as a prefix.

## Attributes

### Data

| Attribute | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| `kind`    | `"prefixedCountNode"` | The node discriminator. |

### Children

| Attribute | Type                                                 | Description                                                                                                                           |
| --------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`  | [`IntegerTypeNode`](../typeNodes/IntegerTypeNode.md) | The integer type used as the count prefix.                                                                                            |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_      | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a prefixed count node from a number node

```typescript
const node = prefixedCountNode(integerTypeNode('u32'));
```

### A variable array of public keys prefixed with a u32

```typescript
arrayTypeNode(publicKeyTypeNode(), prefixedCountNode(integerTypeNode('u32')));
```
