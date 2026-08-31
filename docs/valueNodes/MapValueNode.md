# MapValueNode

A concrete map value: a list of (key, value) entries.

## Attributes

### Data

| Attribute | Type             | Description             |
| --------- | ---------------- | ----------------------- |
| `kind`    | `"mapValueNode"` | The node discriminator. |

### Children

| Attribute | Type                                            | Description                       |
| --------- | ----------------------------------------------- | --------------------------------- |
| `entries` | [`MapEntryValueNode`](./MapEntryValueNode.md)[] | The entries of the map, in order. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a map value node from entries

```typescript
const node = mapValueNode([
    mapEntryValueNode(stringValueNode('apples'), numberValueNode(12)),
    mapEntryValueNode(stringValueNode('bananas'), numberValueNode(34)),
    mapEntryValueNode(stringValueNode('carrots'), numberValueNode(56)),
]);
```
