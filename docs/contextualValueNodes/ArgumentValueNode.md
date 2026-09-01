# ArgumentValueNode

Refers to a value within the data of the surrounding instruction.

## Attributes

### Data

| Attribute | Type                  | Description                                                                                                                                                                                         |
| --------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`    | `"argumentValueNode"` | The node discriminator.                                                                                                                                                                             |
| `path`    | `PathString`          | The path to the referenced value, relative to the instruction's data — e.g. `amount` or `config.fees[0]`. Field segments are only valid where the data type resolves to a struct (following links). |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an argument value node from a path

```typescript
const node = argumentValueNode('amount');
```

### Referencing a value nested within the instruction data

```typescript
argumentValueNode('config.fees[0]');
```

### An instruction argument defaulting to another argument

```typescript
instructionNode({
    identifier: 'mint',
    arguments: [
        instructionArgumentNode({
            identifier: 'amount',
            type: numberTypeNode('u64'),
        }),
        instructionArgumentNode({
            identifier: 'amountToDelegate',
            type: numberTypeNode('u64'),
            defaultValue: argumentValueNode('amount'),
        }),
        // ...
    ],
});
```
