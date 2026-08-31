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

## Examples

### Create a string type node from an encoding

```typescript
const node = stringTypeNode('utf8');
```
