# ConditionalValueNode

A branching contextual value. The condition resolves to a value at instruction time; that result selects between `ifTrue` and `ifFalse`.

## Attributes

### Data

| Attribute | Type                     | Description             |
| --------- | ------------------------ | ----------------------- |
| `kind`    | `"conditionalValueNode"` | The node discriminator. |

### Children

| Attribute   | Type                                                                       | Description                                                                     |
| ----------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `condition` | [`ConditionalValueCondition`](./ConditionalValueCondition.md)              | The value whose evaluation drives the branch.                                   |
| `value`     | [`ValueNode`](../valueNodes/ValueNode.md) _(optional)_                     | When present, the condition result is compared for equality against this value. |
| `ifTrue`    | [`InstructionInputValueNode`](./InstructionInputValueNode.md) _(optional)_ | The value used when the condition resolves truthy (or matches `value`).         |
| `ifFalse`   | [`InstructionInputValueNode`](./InstructionInputValueNode.md) _(optional)_ | The value used when the condition resolves falsy (or does not match `value`).   |
