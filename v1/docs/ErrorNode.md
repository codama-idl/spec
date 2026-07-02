# `ErrorNode`

A program error — a numeric code paired with a name and human-readable message.

## Attributes

### Data

| Attribute | Type                    | Description                                     |
| --------- | ----------------------- | ----------------------------------------------- |
| `kind`    | `"errorNode"`           | The node discriminator.                         |
| `name`    | `CamelCaseString`       | The name of the error.                          |
| `code`    | `u32`                   | The numeric error code returned by the program. |
| `message` | `string`                | A human-readable description of the error.      |
| `docs`    | `string[]` _(optional)_ | Markdown documentation for the error.           |
