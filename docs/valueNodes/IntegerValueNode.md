# IntegerValueNode

A concrete integer value, stored as a string so the full 64- and 128-bit ranges survive JSON transport losslessly.
In memory it maps to a native big integer (`bigint` in JavaScript, `i128`/`u128` in Rust); the surrounding type context narrows it to a specific width.

## Attributes

### Data

| Attribute | Type                 | Description                                                                        |
| --------- | -------------------- | ---------------------------------------------------------------------------------- |
| `kind`    | `"integerValueNode"` | The node discriminator.                                                            |
| `value`   | `IntegerString`      | The integer value, as a base-10 string — e.g. `"42"` or `"-12048014319693667524"`. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an integer value node from a string

```typescript
const node = integerValueNode('42');
```

### A u64 discriminator beyond the safe JavaScript number range

```typescript
integerValueNode('12048014319693667524');

// The quotes are load-bearing: as a JSON number, this value would be
// corrupted to 12048014319693668352 by standard f64 parsing.
```
