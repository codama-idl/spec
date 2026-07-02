# `ConstantNode`

A named constant exposed by the program: a typed value associated with a name.

## Attributes

### Data

| Attribute | Type                    | Description                              |
| --------- | ----------------------- | ---------------------------------------- |
| `kind`    | `"constantNode"`        | The node discriminator.                  |
| `name`    | `CamelCaseString`       | The name of the constant.                |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the constant. |

### Children

| Attribute | Type                                     | Description                         |
| --------- | ---------------------------------------- | ----------------------------------- |
| `type`    | [`TypeNode`](./typeNodes/TypeNode.md)    | The type of the constant.           |
| `value`   | [`ValueNode`](./valueNodes/ValueNode.md) | The concrete value of the constant. |
