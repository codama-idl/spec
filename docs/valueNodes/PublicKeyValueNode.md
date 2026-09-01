# PublicKeyValueNode

A concrete 32-byte public key, with an optional symbolic identifier for the address.

## Attributes

### Data

| Attribute    | Type                            | Description                                                       |
| ------------ | ------------------------------- | ----------------------------------------------------------------- |
| `kind`       | `"publicKeyValueNode"`          | The node discriminator.                                           |
| `publicKey`  | `Address`                       | The base58-encoded public key.                                    |
| `identifier` | `IdentifierString` _(optional)_ | A symbolic name for the address, useful in generated client code. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a public key value node from a base58 public key

```typescript
const node = publicKeyValueNode('7rA1KcBdW5hKmMasQdRVBFsD6T1nLtYuR6y59TJNgevR');
```
