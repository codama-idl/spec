# InstructionByteDeltaNode

A byte-size delta applied when computing rent or buffer size — typically used by instructions that resize accounts.
For instance, if an instruction creates a new account of 42 bytes, this node can carry that information, enabling clients to allocate the right amount of lamports to cover the cost of executing the instruction.

## Attributes

### Data

| Attribute    | Type                         | Description                                                                                                                                                |
| ------------ | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`       | `"instructionByteDeltaNode"` | The node discriminator.                                                                                                                                    |
| `withHeader` | `boolean`                    | Whether the delta includes the account header overhead — i.e. 128 bytes. Defaults to `false` when the value is a `resolverValueNode` and `true` otherwise. |
| `subtract`   | `boolean` _(optional)_       | When `true`, the delta is subtracted from the running size instead of added. Defaults to `false`.                                                          |

### Children

| Attribute | Type                                                          | Description                                                                                                                           |
| --------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `value`   | [`InstructionByteDeltaValue`](./InstructionByteDeltaValue.md) | The source of the delta value — a literal number, a referenced account or argument, or a resolver.                                    |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_                | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### A byte delta that represents a new account

```typescript
instructionByteDeltaNode(accountLinkNode('token'));
```

### A byte delta that represents an account deletion

```typescript
instructionByteDeltaNode(accountLinkNode('token'), { subtract: true });
```

### A byte delta that uses an argument value to increase the space of an account

```typescript
instructionByteDeltaNode(argumentValueNode('additionalSpace'), { withHeader: false });
```
