# StringTypeNode

A string value.
The encoding describes how its bytes are written.
The byte length is determined by an enclosing wrapper such as `sizePrefixTypeNode` or `fixedSizeTypeNode`.

## Attributes

### Data

| Attribute | Type               | Description             |
| --------- | ------------------ | ----------------------- |
| `kind`    | `"stringTypeNode"` | The node discriminator. |

### Children

| Attribute  | Type                                                                     | Description                                              |
| ---------- | ------------------------------------------------------------------------ | -------------------------------------------------------- |
| `encoding` | [`BytesEncoding`](../sharedNodes/BytesEncoding.md)                       | The byte encoding used to serialise the string.          |
| `display`  | [`StringDisplayNode`](../displayNodes/StringDisplayNode.md) _(optional)_ | Display metadata describing how the string is presented. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a string type node from an encoding

```typescript
const node = stringTypeNode('utf8');
```
