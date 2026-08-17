# DefinedTypeNode

A reusable named type that can be referenced by `definedTypeLinkNode` from elsewhere in the IDL.

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
