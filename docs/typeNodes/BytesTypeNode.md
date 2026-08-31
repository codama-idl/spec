# BytesTypeNode

A raw sequence of bytes. Typically used inside a fixed-size, size-prefixed, or sentinel-terminated wrapper.

## Attributes

### Data

| Attribute | Type              | Description             |
| --------- | ----------------- | ----------------------- |
| `kind`    | `"bytesTypeNode"` | The node discriminator. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a bytes type node

```typescript
const node = bytesTypeNode();
```
