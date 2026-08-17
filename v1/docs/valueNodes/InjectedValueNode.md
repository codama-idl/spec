# InjectedValueNode

A value resolved by key from a surrounding provider. A `providedNode` higher in the resolution tree supplies the actual value; the consumer references only the `key`, so the same type stays portable across instructions that wire the key differently. Resolution is a per-context property: a value with the same key may resolve in one instruction and not another.

## Attributes

### Data

| Attribute | Type                  | Description                                                     |
| --------- | --------------------- | --------------------------------------------------------------- |
| `kind`    | `"injectedValueNode"` | The node discriminator.                                         |
| `key`     | `CamelCaseString`     | The key looked up against the surrounding provide/inject graph. |

### Children

| Attribute  | Type                                       | Description                                     |
| ---------- | ------------------------------------------ | ----------------------------------------------- |
| `fallback` | [`ValueNode`](./ValueNode.md) _(optional)_ | A value used when no provider supplies the key. |
