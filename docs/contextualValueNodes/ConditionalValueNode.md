# ConditionalValueNode

A branching contextual value.
The condition resolves to a value at instruction time; that result selects between `ifTrue` and `ifFalse`.

## Attributes

### Data

| Attribute | Type                     | Description             |
| --------- | ------------------------ | ----------------------- |
| `kind`    | `"conditionalValueNode"` | The node discriminator. |

### Children

| Attribute   | Type                                                                       | Description                                                                                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `condition` | [`ConditionalValueCondition`](./ConditionalValueCondition.md)              | The value whose evaluation drives the branch.                                                                                                                                                                    |
| `value`     | [`ValueNode`](../valueNodes/ValueNode.md) _(optional)_                     | When present, the condition result is compared for equality against this value. When omitted, the condition passes if the referenced account or argument exists in the current context, regardless of its value. |
| `ifTrue`    | [`InstructionInputValueNode`](./InstructionInputValueNode.md) _(optional)_ | The value used when the condition passes — i.e. it matches `value` or, without a `value`, exists.                                                                                                                |
| `ifFalse`   | [`InstructionInputValueNode`](./InstructionInputValueNode.md) _(optional)_ | The value used when the condition fails — i.e. it does not match `value` or, without a `value`, does not exist.                                                                                                  |
| `plugins`   | [`PluginNode`](../PluginNode.md)[] _(optional)_                            | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                                                            |

## Examples

### Create a conditional value node from an input object

```typescript
const node = conditionalValueNode({
    condition: argumentValueNode('amount'),
    value: numberValueNode(0),
    ifTrue: accountValueNode('mint'),
    ifFalse: programIdValueNode(),
});
```

### An instruction account that defaults to another account if a condition is met

```typescript
instructionNode({
    identifier: 'transfer',
    accounts: [
        instructionAccountNode({
            identifier: 'source',
            isSigner: false,
            isWritable: true,
        }),
        instructionAccountNode({
            identifier: 'destination',
            isSigner: false,
            isWritable: true,
            isOptional: true,
            defaultValue: conditionalValueNode({
                condition: argumentValueNode('amount'),
                value: numberValueNode(0),
                ifTrue: accountValueNode('source'),
            }),
        }),
        // ...
    ],
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'amount',
            type: numberTypeNode('u64'),
        }),
    ]),
});
```
