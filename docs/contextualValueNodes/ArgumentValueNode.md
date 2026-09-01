# ArgumentValueNode

Refers to a named argument of the surrounding instruction.

## Attributes

### Data

| Attribute    | Type                  | Description                                |
| ------------ | --------------------- | ------------------------------------------ |
| `kind`       | `"argumentValueNode"` | The node discriminator.                    |
| `identifier` | `IdentifierString`    | The identifier of the referenced argument. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an argument value node from an argument name

```typescript
const node = argumentValueNode('amount');
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
