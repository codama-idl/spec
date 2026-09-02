# ProvidedNode

Exposes a node under a key so consumers in the surrounding scope can resolve it.
Sits inside a host's `provides` list and pairs with `injectedValueNode` on the consumer side: an injection with the matching key resolves to this entry's `node`.
Scoping is lexical: the nearest enclosing `provides` entry for a key wins, shadowing entries from outer scopes.

## Attributes

### Data

| Attribute    | Type               | Description                                           |
| ------------ | ------------------ | ----------------------------------------------------- |
| `kind`       | `"providedNode"`   | The node discriminator.                               |
| `identifier` | `IdentifierString` | The key under which the node is exposed to consumers. |

### Children

| Attribute | Type                                           | Description                                                                                                                                                              |
| --------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `node`    | `anyNode`                                      | The exposed node. The provider is a transparent pipe — any node may be supplied; the family check happens at the injection point against the consumer's expected family. |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                                    |

## Examples

### Providing a constant value to consumers

```typescript
providedNode('decimals', integerValueNode('9'));
```

### A provided value consumed via injection

```typescript
instructionNode({
    identifier: 'transferChecked',
    provides: [providedNode('decimals', integerValueNode('9'))],
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'decimals',
            type: integerTypeNode('u8'),
            defaultValue: injectedValueNode({ key: 'decimals' }),
        }),
        // ...
    ]),
});
```
