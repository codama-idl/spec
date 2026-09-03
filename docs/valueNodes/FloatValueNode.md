# FloatValueNode

A concrete floating-point value, stored as a string so round-trips are deterministic across serialisers.
The surrounding type context narrows it to a specific width.

## Attributes

### Data

| Attribute | Type               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`    | `"floatValueNode"` | The node discriminator.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `value`   | `DecimalString`    | The canonical decimal value — e.g. `"1.5"`, `"-0.25"` or `"602000000"`; never `"1.50"`, `".5"` or `"6.02e8"`. The specials `"NaN"`, `"Infinity"` and `"-Infinity"` are permitted, and `"-0"` is valid since floats have signed zero. The single spelling guarantees that two equal values can never have distinct node representations, so structural comparison, hashing and deduplication never diverge on formatting. It canonicalises the decimal string’s spelling, not the binary float it rounds to — `"0.1"` and a 30-digit decimal that rounds to the same f64 are distinct, individually canonical values. |

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
    defaultValue: floatValueNode('1'),
});
```
