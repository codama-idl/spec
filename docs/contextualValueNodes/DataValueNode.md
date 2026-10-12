# DataValueNode

Refers to a value within the data of the surrounding instruction.

## Attributes

### Data

| Attribute | Type              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`    | `"dataValueNode"` | The node discriminator.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `path`    | `PathString`      | The path to the referenced value, relative to the instruction's data — e.g. `amount` or `config.fees[0]`. Field segments are only valid where the data type resolves to a struct (following type and account links). A path crossing a public key's `accountLink` requires reading the linked account's state. When presenting, an unresolvable path falls back as usual. When building an instruction, e.g. for a PDA seed or a default value, there is nothing to fall back to: consumers that cannot or do not read the account must fail explicitly rather than guess. |

### Children

| Attribute | Type                                            | Description                                     |
| --------- | ----------------------------------------------- | ----------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. |

## Examples

### Create a data value node from a path

```typescript
const node = dataValueNode('amount');
```

### Referencing a value nested within the instruction data

```typescript
dataValueNode('config.fees[0]');
```

### An instruction data field defaulting to another field

```typescript
instructionNode({
    identifier: 'mint',
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'amount',
            type: integerTypeNode('u64'),
        }),
        structFieldTypeNode({
            identifier: 'amountToDelegate',
            type: integerTypeNode('u64'),
            defaultValue: injectedValueNode({ key: 'amountToDelegate' }),
        }),
        // ...
    ]),
    provides: [providedNode('amountToDelegate', dataValueNode('amount'))],
});
```
