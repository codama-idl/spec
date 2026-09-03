# ErrorNode

A program error — a numeric code paired with a name and human-readable message.

![Diagram](https://github.com/codama-idl/codama/assets/3642397/0bde98ea-0327-404b-bf38-137d105826b0)

## Attributes

### Data

| Attribute    | Type               | Description                                     |
| ------------ | ------------------ | ----------------------------------------------- |
| `kind`       | `"errorNode"`      | The node discriminator.                         |
| `identifier` | `IdentifierString` | The identifier of the error.                    |
| `code`       | `u32`              | The numeric error code returned by the program. |

### Children

| Attribute | Type                                                 | Description                                                                                                                           |
| --------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `message` | `string` \| [`TextNode`](./TextNode.md)              | A human-readable description of the error.                                                                                            |
| `docs`    | `string` \| [`TextNode`](./TextNode.md) _(optional)_ | Markdown documentation for the error.                                                                                                 |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_       | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create an error node from an input object

```typescript
const node = errorNode({
    identifier: 'invalidAmountArgument',
    code: 1,
    message: 'The amount argument is invalid.',
});
```
