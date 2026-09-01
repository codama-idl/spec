# ResolverValueNode

A custom resolver: a named function provided by the consumer that produces a value.
May optionally depend on other accounts and arguments resolved at instruction-build time.
This node acts as a fallback for any value or logic that cannot easily be described by the other nodes — renderers treat resolvers as functions that can be injected into the generated code.

## Attributes

### Data

| Attribute    | Type                    | Description                                                                                                  |
| ------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| `kind`       | `"resolverValueNode"`   | The node discriminator.                                                                                      |
| `identifier` | `IdentifierString`      | A unique identifier for the resolver. This is typically the name of the function that renderers will invoke. |
| `docs`       | `string[]` _(optional)_ | Markdown documentation for the resolver.                                                                     |

### Children

| Attribute   | Type                                                           | Description                                                                                                                           |
| ----------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `dependsOn` | [`ResolverDependency`](./ResolverDependency.md)[] _(optional)_ | The accounts and arguments the resolver depends on. Used by clients to ensure the dependencies are resolved first.                    |
| `plugins`   | [`PluginNode`](../PluginNode.md)[] _(optional)_                | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a resolver value node from a name and options

```typescript
const node = resolverValueNode('resolveCustomTokenProgram', {
    docs: [
        'If the mint account has more than 0 decimals and the ',
        'delegated amount is greater than zero, then we use our ',
        'own custom token program. Otherwise, we use Token 2022.',
    ],
    dependsOn: [accountValueNode('mint'), argumentValueNode('delegatedAmount')],
});
```
