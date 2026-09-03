# StructFieldTypeNode

A named field within a struct type.

## Attributes

### Data

| Attribute    | Type                    | Description                  |
| ------------ | ----------------------- | ---------------------------- |
| `kind`       | `"structFieldTypeNode"` | The node discriminator.      |
| `identifier` | `IdentifierString`      | The identifier of the field. |

### Children

| Attribute              | Type                                                                               | Description                                                                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultValueStrategy` | [`DefaultValueStrategy`](../sharedNodes/DefaultValueStrategy.md) _(optional)_      | How a configured default value is exposed in generated APIs. Only relevant when `defaultValue` is set — a strategy without a default value is meaningless. When absent, `optional` is assumed. |
| `docs`                 | `string` \| [`TextNode`](../TextNode.md) _(optional)_                              | Markdown documentation for the field.                                                                                                                                                          |
| `type`                 | [`TypeNode`](./TypeNode.md)                                                        | The type of the field.                                                                                                                                                                         |
| `defaultValue`         | [`ValueNode`](../valueNodes/ValueNode.md) _(optional)_                             | A default value used when the field is omitted by callers.                                                                                                                                     |
| `display`              | [`StructFieldDisplayNode`](../displayNodes/StructFieldDisplayNode.md) _(optional)_ | Display metadata describing how the field is presented.                                                                                                                                        |
| `plugins`              | [`PluginNode`](../PluginNode.md)[] _(optional)_                                    | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                                          |

## Examples

### A struct field with a default value

```typescript
structFieldTypeNode({
    identifier: 'age',
    type: integerTypeNode('u8'),
    defaultValue: integerValueNode('42'),
});

// {}          => 0x2A
// { age: 29 } => 0x1D
```
