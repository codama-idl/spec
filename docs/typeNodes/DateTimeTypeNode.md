# DateTimeTypeNode

A timestamp encoded as a number, typically seconds since the Unix epoch. The wrapped number type determines the byte width.

## Attributes

### Data

| Attribute | Type                 | Description             |
| --------- | -------------------- | ----------------------- |
| `kind`    | `"dateTimeTypeNode"` | The node discriminator. |

### Children

| Attribute | Type                                                                             | Description                                       |
| --------- | -------------------------------------------------------------------------------- | ------------------------------------------------- |
| `number`  | [`NestedTypeNode`](./NestedTypeNode.md)<[`NumberTypeNode`](./NumberTypeNode.md)> | The numeric type used to serialise the timestamp. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a date time type node from a number type node

```typescript
const node = dateTimeTypeNode(numberTypeNode('u64'));
```

### u64 unix datetime

```typescript
dateTimeTypeNode(numberTypeNode('u64'));

// 2024-06-27T14:57:56Z => 0xF47D7D6600000000
```
