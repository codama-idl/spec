# ProgramNode

A Solana program: its identity, version, accounts, instructions, defined types, PDAs, events, errors, and constants.

## Attributes

### Data

| Attribute   | Type                    | Description                                 |
| ----------- | ----------------------- | ------------------------------------------- |
| `kind`      | `"programNode"`         | The node discriminator.                     |
| `name`      | `CamelCaseString`       | The name of the program.                    |
| `publicKey` | `Address`               | The base58-encoded program ID.              |
| `version`   | `SemverString`          | The version of the program, in semver form. |
| `docs`      | `string[]` _(optional)_ | Markdown documentation for the program.     |

### Children

| Attribute      | Type                                                           | Description                                                                |
| -------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `origin`       | [`ProgramOrigin`](./sharedNodes/ProgramOrigin.md) _(optional)_ | The toolchain that originally generated the program description, if known. |
| `accounts`     | [`AccountNode`](./AccountNode.md)[]                            | The accounts owned by the program.                                         |
| `instructions` | [`InstructionNode`](./InstructionNode.md)[]                    | The instructions exposed by the program.                                   |
| `definedTypes` | [`DefinedTypeNode`](./DefinedTypeNode.md)[]                    | The reusable types defined by the program.                                 |
| `pdas`         | [`PdaNode`](./PdaNode.md)[]                                    | The PDAs derived by the program.                                           |
| `events`       | [`EventNode`](./EventNode.md)[]                                | The events emitted by the program.                                         |
| `errors`       | [`ErrorNode`](./ErrorNode.md)[]                                | The errors returned by the program.                                        |
| `constants`    | [`ConstantNode`](./ConstantNode.md)[]                          | The constants exposed by the program.                                      |
