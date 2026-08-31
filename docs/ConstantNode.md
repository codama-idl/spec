# ConstantNode

A named constant exposed by the program: a typed value associated with a name.

## Attributes

### Data

| Attribute | Type                    | Description                              |
| --------- | ----------------------- | ---------------------------------------- |
| `kind`    | `"constantNode"`        | The node discriminator.                  |
| `name`    | `CamelCaseString`       | The name of the constant.                |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the constant. |

### Children

| Attribute | Type                                     | Description                         |
| --------- | ---------------------------------------- | ----------------------------------- |
| `type`    | [`TypeNode`](./typeNodes/TypeNode.md)    | The type of the constant.           |
| `value`   | [`ValueNode`](./valueNodes/ValueNode.md) | The concrete value of the constant. |

### Base

| Attribute | Type                                           | Description                                                                                                                                                     |
| --------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Numeric Constant

```typescript
const node = constantNode('maxSize', numberTypeNode('u32'), numberValueNode(100));
```

### Bytes Constant

```typescript
const node = constantNode('seedPrefix', bytesTypeNode(), bytesValueNode('base16', '74657374'));
```

### With Documentation

```typescript
const node = constantNode('maxItems', numberTypeNode('u64'), numberValueNode(1000), [
    'The maximum number of items allowed.',
]);
```
