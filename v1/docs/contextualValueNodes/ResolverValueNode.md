# `ResolverValueNode`

A custom resolver: a named function provided by the consumer that produces a value. May optionally depend on other accounts and arguments resolved at instruction-build time.

## Attributes

### Data

| Attribute | Type                    | Description                              |
| --------- | ----------------------- | ---------------------------------------- |
| `kind`    | `"resolverValueNode"`   | The node discriminator.                  |
| `name`    | `CamelCaseString`       | The name of the resolver function.       |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the resolver. |

### Children

| Attribute   | Type                                                           | Description                                                                                                        |
| ----------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `dependsOn` | [`ResolverDependency`](./ResolverDependency.md)[] _(optional)_ | The accounts and arguments the resolver depends on. Used by clients to ensure the dependencies are resolved first. |
