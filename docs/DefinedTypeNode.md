# DefinedTypeNode

A reusable named type that can be referenced by `definedTypeLinkNode` from elsewhere in the IDL.

![Diagram](https://github.com/codama-idl/codama/assets/3642397/6049cf77-9a70-4915-8276-dd571d2f8828)

## Attributes

### Data

| Attribute | Type                    | Description                          |
| --------- | ----------------------- | ------------------------------------ |
| `kind`    | `"definedTypeNode"`     | The node discriminator.              |
| `name`    | `CamelCaseString`       | The name of the defined type.        |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the type. |

### Children

| Attribute | Type                                  | Description          |
| --------- | ------------------------------------- | -------------------- |
| `type`    | [`TypeNode`](./typeNodes/TypeNode.md) | The type definition. |

### Base

| Attribute | Type                                           | Description                                                                                                                                                     |
| --------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugins` | [`PluginNode`](./PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. Available on every node — the universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a defined type node from an input object

```typescript
const node = definedTypeNode({
    name: 'person',
    docs: ['This type describes a Person.'],
    type: structTypeNode([
        structFieldTypeNode({ name: 'name', type: stringTypeNode('utf8') }),
        structFieldTypeNode({ name: 'age', type: numberTypeNode('u8') }),
    ]),
});
```
