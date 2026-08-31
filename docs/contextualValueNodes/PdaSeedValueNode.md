# PdaSeedValueNode

Pairs a PDA seed name with the value to substitute when deriving the PDA.

## Attributes

### Data

| Attribute | Type                 | Description                                                                           |
| --------- | -------------------- | ------------------------------------------------------------------------------------- |
| `kind`    | `"pdaSeedValueNode"` | The node discriminator.                                                               |
| `name`    | `CamelCaseString`    | The name of the seed being filled in — a `variablePdaSeedNode` of the PDA definition. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `value`   | [`PdaSeedValueValue`](./PdaSeedValueValue.md)   | The value to substitute for the seed.                                                                                                 |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a PDA seed value node from a name and a value

```typescript
const node = pdaSeedValueNode('mint', accountValueNode('mint'));
```
