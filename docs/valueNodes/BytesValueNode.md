# BytesValueNode

A concrete bytes value, encoded as text in the chosen encoding.

## Attributes

### Data

| Attribute | Type               | Description                                                      |
| --------- | ------------------ | ---------------------------------------------------------------- |
| `kind`    | `"bytesValueNode"` | The node discriminator.                                          |
| `data`    | `string`           | The bytes encoded as a text string per the `encoding` attribute. |

### Children

| Attribute  | Type                                               | Description                                       |
| ---------- | -------------------------------------------------- | ------------------------------------------------- |
| `encoding` | [`BytesEncoding`](../sharedNodes/BytesEncoding.md) | The encoding used to represent the bytes as text. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a bytes value node from an encoding and data

```typescript
const node = bytesValueNode('base16', '010203');
const utf8Node = bytesValueNode('utf8', 'Hello');
```
