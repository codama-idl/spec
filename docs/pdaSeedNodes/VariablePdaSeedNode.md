# VariablePdaSeedNode

A PDA seed whose value is provided at derivation time, identified by name.

## Attributes

### Data

| Attribute | Type                    | Description                                   |
| --------- | ----------------------- | --------------------------------------------- |
| `kind`    | `"variablePdaSeedNode"` | The node discriminator.                       |
| `name`    | `CamelCaseString`       | The name of the seed variable.                |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the seed variable. |

### Children

| Attribute | Type                                   | Description                          |
| --------- | -------------------------------------- | ------------------------------------ |
| `type`    | [`TypeNode`](../typeNodes/TypeNode.md) | The expected type of the seed value. |

### Base

| Attribute | Type                                            | Description                                                                                                                                                     |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a variable PDA seed node from a name and a type node

```typescript
const node = variablePdaSeedNode('amount', numberTypeNode('u32'));
```

### A PDA node with a public key variable seed

```typescript
pdaNode({
    name: 'ticket',
    seeds: [variablePdaSeedNode('authority', publicKeyTypeNode())],
});
```
