# EventNode

A program event: its data shape and optional discriminators used to identify it on the wire.

## Attributes

### Data

| Attribute | Type                    | Description                           |
| --------- | ----------------------- | ------------------------------------- |
| `kind`    | `"eventNode"`           | The node discriminator.               |
| `name`    | `CamelCaseString`       | The name of the event.                |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the event. |

### Children

| Attribute        | Type                                                                            | Description                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `data`           | [`TypeNode`](./typeNodes/TypeNode.md)                                           | The type describing the event payload.                                                                                  |
| `discriminators` | [`DiscriminatorNode`](./discriminatorNodes/DiscriminatorNode.md)[] _(optional)_ | Discriminators that distinguish this event from others. When multiple are listed, they are combined with a logical AND. |
