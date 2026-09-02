# InjectedValueNode

A value resolved by key from a surrounding provider.
A `providedNode` higher in the resolution tree supplies the actual value; the consumer references only the `key`, so the same type stays portable across instructions that wire the key differently.
Resolution is lexical: a key resolves against the nearest enclosing `provides` list, innermost wins (shadowing allowed), and outer scopes remain visible — e.g. a sub-instruction may shadow a key provided by its parent.
IDLs must be self-contained: within its final context, every key must resolve to a provided entry or carry a `fallback`, so whether a value is resolvable is statically checkable.

## Attributes

### Data

| Attribute | Type                  | Description                                                     |
| --------- | --------------------- | --------------------------------------------------------------- |
| `kind`    | `"injectedValueNode"` | The node discriminator.                                         |
| `key`     | `IdentifierString`    | The key looked up against the surrounding provide/inject graph. |

### Children

| Attribute  | Type                                            | Description                                                                                                                                          |
| ---------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fallback` | [`ValueNode`](./ValueNode.md) _(optional)_      | A value used when no provider supplies the key. When absent, the key is required: a provider must supply it for the surrounding context to be valid. |
| `plugins`  | [`PluginNode`](../PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata.                |

## Examples

### A required injected value

```typescript
injectedValueNode({ key: 'decimals' });
```

### An injected value with a fallback

```typescript
injectedValueNode({ key: 'decimals', fallback: numberValueNode(0) });
```
