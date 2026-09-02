# FloatValueNode

A concrete floating-point value, stored as a string so round-trips are deterministic across serialisers.
The surrounding type context narrows it to a specific width.

## Attributes

### Data

| Attribute | Type               | Description                                                                                                                     |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `kind`    | `"floatValueNode"` | The node discriminator.                                                                                                         |
| `value`   | `DecimalString`    | The decimal value — e.g. `"1.5"`, `"-0.25"` or `"6.02e23"`. The specials `"NaN"`, `"Infinity"` and `"-Infinity"` are permitted. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a float value node from a string

```typescript
const node = floatValueNode('1.5');
```

### A default value for an f64 field

```typescript
structFieldTypeNode({
    identifier: 'exchangeRate',
    type: floatTypeNode('f64'),
    defaultValue: floatValueNode('1.0'),
});
```
