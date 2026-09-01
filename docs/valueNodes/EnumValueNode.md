# EnumValueNode

A concrete value of a defined enum: a variant identifier plus an optional payload.

## Attributes

### Data

| Attribute | Type               | Description                             |
| --------- | ------------------ | --------------------------------------- |
| `kind`    | `"enumValueNode"`  | The node discriminator.                 |
| `variant` | `IdentifierString` | The identifier of the selected variant. |

### Children

| Attribute | Type                                                         | Description                                                                                                                           |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `enum`    | [`DefinedTypeLinkNode`](../linkNodes/DefinedTypeLinkNode.md) | A link to the defined enum type the value belongs to. The linked defined type must contain an `enumTypeNode`.                         |
| `value`   | [`EnumValuePayload`](./EnumValuePayload.md) _(optional)_     | The variant payload — a struct value for struct variants or a tuple value for tuple variants. Omitted for unit variants.              |
| `plugins` | [`PluginNode`](../PluginNode.md)[] _(optional)_              | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

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
        structFieldValueNode('age', numberValueNode(42)),
    ]),
);
```
