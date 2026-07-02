# `ProvidedNode`

Exposes a node under a name so consumers in the surrounding scope can resolve it by that key. Sits inside a host's `provides` list and pairs with `injectedValueNode` on the consumer side: an injection with the matching key resolves to this entry's `node`.

## Attributes

### Data

| Attribute | Type              | Description                                           |
| --------- | ----------------- | ----------------------------------------------------- |
| `kind`    | `"providedNode"`  | The node discriminator.                               |
| `name`    | `CamelCaseString` | The key under which the node is exposed to consumers. |

### Children

| Attribute | Type      | Description                                                                                                                                                              |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `node`    | `anyNode` | The exposed node. The provider is a transparent pipe — any node may be supplied; the family check happens at the injection point against the consumer's expected family. |
