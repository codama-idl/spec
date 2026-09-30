# StringValueNode

A concrete string value.

## Attributes

### Data

| Attribute | Type                | Description             |
| --------- | ------------------- | ----------------------- |
| `kind`    | `"stringValueNode"` | The node discriminator. |
| `string`  | `string`            | The string value.       |

### Children

| Attribute | Type                                            | Description                                     |
| --------- | ----------------------------------------------- | ----------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. |

## Examples

### Create a string value node from a string

```typescript
const node = stringValueNode('Hello');
```
