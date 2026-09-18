# PublicKeyTypeNode

A 32-byte Solana public key.

## Attributes

### Data

| Attribute | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| `kind`    | `"publicKeyTypeNode"` | The node discriminator. |

### Children

| Attribute    | Type                                                                 | Description                                                                                  |
| ------------ | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `transforms` | [`TransformNode`](../transformNodes/TransformNode.md)[] _(optional)_ | Transforms applied to the serialisation of this type, in order — the first is the innermost. |
| `plugins`    | [`PluginNode`](../PluginNode.md)[] _(optional)_                      | Namespaced plugins with custom structured data.                                              |

## Examples

### Create a public key type node

```typescript
const node = publicKeyTypeNode();
```
