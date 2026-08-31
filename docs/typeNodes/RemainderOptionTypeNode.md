# RemainderOptionTypeNode

A value that may be present or absent. Presence is signalled by whether any bytes remain to be read, with no explicit prefix.

## Attributes

### Data

| Attribute | Type                        | Description             |
| --------- | --------------------------- | ----------------------- |
| `kind`    | `"remainderOptionTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                        | Description                                  |
| --------- | --------------------------- | -------------------------------------------- |
| `item`    | [`TypeNode`](./TypeNode.md) | The type carried by the option when present. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### An optional UTF-8 string using remaining bytes

```typescript
remainderOptionTypeNode(stringTypeNode('utf8'));

// None          => 0x
// Some("Hello") => 0x48656C6C6F
```
