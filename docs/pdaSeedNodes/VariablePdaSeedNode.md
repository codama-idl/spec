# VariablePdaSeedNode

A PDA seed whose value is provided at derivation time, identified by name.

## Attributes

### Data

| Attribute    | Type                    | Description                                   |
| ------------ | ----------------------- | --------------------------------------------- |
| `kind`       | `"variablePdaSeedNode"` | The node discriminator.                       |
| `identifier` | `IdentifierString`      | The identifier of the seed variable.          |
| `docs`       | `string[]` _(optional)_ | Markdown documentation for the seed variable. |

### Children

| Attribute | Type                                            | Description                                                                                                                           |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `type`    | [`TypeNode`](../typeNodes/TypeNode.md)          | The expected type of the seed value.                                                                                                  |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a variable PDA seed node from a name and a type node

```typescript
const node = variablePdaSeedNode('amount', integerTypeNode('u32'));
```

### A PDA node with a public key variable seed

```typescript
pdaNode({
    identifier: 'ticket',
    seeds: [variablePdaSeedNode('authority', publicKeyTypeNode())],
});
```
