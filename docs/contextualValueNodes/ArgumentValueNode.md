# ArgumentValueNode

Refers to a named argument of the surrounding instruction.

## Attributes

### Data

| Attribute | Type                  | Description                          |
| --------- | --------------------- | ------------------------------------ |
| `kind`    | `"argumentValueNode"` | The node discriminator.              |
| `name`    | `CamelCaseString`     | The name of the referenced argument. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an argument value node from an argument name

```typescript
const node = argumentValueNode('amount');
```

### An instruction argument defaulting to another argument

```typescript
instructionNode({
    name: 'mint',
    arguments: [
        instructionArgumentNode({
            name: 'amount',
            type: numberTypeNode('u64'),
        }),
        instructionArgumentNode({
            name: 'amountToDelegate',
            type: numberTypeNode('u64'),
            defaultValue: argumentValueNode('amount'),
        }),
        // ...
    ],
});
```
