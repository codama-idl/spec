# EnumValueNode

A concrete value of a defined enum: a variant identifier plus an optional payload.

## Attributes

### Data

| Attribute | Type               | Description                             |
| --------- | ------------------ | --------------------------------------- |
| `kind`    | `"enumValueNode"`  | The node discriminator.                 |
| `variant` | `IdentifierString` | The identifier of the selected variant. |

### Children

| Attribute | Type                                                         | Description                                                                                                                                                                                   |
| --------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enum`    | [`DefinedTypeLinkNode`](../linkNodes/DefinedTypeLinkNode.md) | A link to the defined enum type the value belongs to. The linked defined type must contain an `enumTypeNode`.                                                                                 |
| `value`   | [`ValueNode`](./ValueNode.md) _(optional)_                   | The value of the variant's `data` — any value node matching its type, e.g. a struct value for a struct payload or an integer value for an integer payload. Omitted for variants without data. |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_              | Namespaced plugins with custom structured data.                                                                                                                                               |

## Examples

### Create an enum value node from an enum, a variant, and an optional value

```typescript
const node = enumValueNode('myEnum', 'myVariant');
const nodeWithExplicitEnum = enumValueNode(definedTypeLinkNode('myEnum'), 'myVariant');

const nodeWithData = enumValueNode(
    'myEnum',
    'myVariantWithData',
    structValueNode([
        structFieldValueNode('name', stringValueNode('Alice')),
        structFieldValueNode('age', integerValueNode('42')),
    ]),
);

// The payload is any value matching the variant's data type, here an integer.
const nodeWithAmount = enumValueNode('operation', 'amount', integerValueNode('42'));
```
