# StructFieldValueNode

A named field of a `structValueNode`.

## Attributes

### Data

| Attribute    | Type                     | Description                  |
| ------------ | ------------------------ | ---------------------------- |
| `kind`       | `"structFieldValueNode"` | The node discriminator.      |
| `identifier` | `IdentifierString`       | The identifier of the field. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `value`   | [`ValueNode`](./ValueNode.md)                   | The concrete value of the field.                                                                                                      |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a struct field value node from a name and a value

```typescript
const node = structFieldValueNode('age', integerValueNode('42'));
```
