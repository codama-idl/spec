# PublicKeyTypeNode

A 32-byte Solana public key.

## Attributes

### Data

| Attribute | Type                  | Description             |
| --------- | --------------------- | ----------------------- |
| `kind`    | `"publicKeyTypeNode"` | The node discriminator. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a public key type node

```typescript
const node = publicKeyTypeNode();
```
