# ConstantNode

A named constant exposed by the program: a typed value associated with a name.

## Attributes

### Data

| Attribute    | Type               | Description                     |
| ------------ | ------------------ | ------------------------------- |
| `kind`       | `"constantNode"`   | The node discriminator.         |
| `identifier` | `IdentifierString` | The identifier of the constant. |

### Children

| Attribute | Type                                                 | Description                                                                                                                           |
| --------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `docs`    | `string` \| [`TextNode`](./TextNode.md) _(optional)_ | Markdown documentation for the constant.                                                                                              |
| `type`    | [`TypeNode`](./typeNodes/TypeNode.md)                | The type of the constant.                                                                                                             |
| `value`   | [`ValueNode`](./valueNodes/ValueNode.md)             | The concrete value of the constant.                                                                                                   |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_       | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Numeric Constant

```typescript
const node = constantNode('maxSize', integerTypeNode('u32'), integerValueNode('100'));
```

### Bytes Constant

```typescript
const node = constantNode('seedPrefix', bytesTypeNode(), bytesValueNode('base16', '74657374'));
```

### With Documentation

```typescript
const node = constantNode('maxItems', integerTypeNode('u64'), integerValueNode('1000'), [
    'The maximum number of items allowed.',
]);
```
