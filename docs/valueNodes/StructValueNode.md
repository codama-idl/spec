# StructValueNode

A concrete struct value: a list of named field values.

## Attributes

### Data

| Attribute | Type                | Description             |
| --------- | ------------------- | ----------------------- |
| `kind`    | `"structValueNode"` | The node discriminator. |

### Children

| Attribute | Type                                                  | Description                           |
| --------- | ----------------------------------------------------- | ------------------------------------- |
| `fields`  | [`StructFieldValueNode`](./StructFieldValueNode.md)[] | The named fields of the struct value. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a struct value node from field value nodes

```typescript
const node = structValueNode([
    structFieldValueNode('name', stringValueNode('Alice')),
    structFieldValueNode('age', numberValueNode(42)),
]);
```
