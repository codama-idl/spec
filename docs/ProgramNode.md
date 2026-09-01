# ProgramNode

A Solana program: its identity, version, accounts, instructions, defined types, PDAs, events, errors, and constants.

![Diagram](https://github.com/codama-idl/codama/assets/3642397/37ec38ea-66df-4c08-81c3-822ef4388580)

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

| Attribute      | Type                                           | Description                                                                                                                           |
| -------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `accounts`     | [`AccountNode`](./AccountNode.md)[]            | The accounts owned by the program.                                                                                                    |
| `instructions` | [`InstructionNode`](./InstructionNode.md)[]    | The instructions exposed by the program.                                                                                              |
| `definedTypes` | [`DefinedTypeNode`](./DefinedTypeNode.md)[]    | The reusable types defined by the program.                                                                                            |
| `pdas`         | [`PdaNode`](./PdaNode.md)[]                    | The PDAs derived by the program.                                                                                                      |
| `events`       | [`EventNode`](./EventNode.md)[]                | The events emitted by the program.                                                                                                    |
| `errors`       | [`ErrorNode`](./ErrorNode.md)[]                | The errors returned by the program.                                                                                                   |
| `constants`    | [`ConstantNode`](./ConstantNode.md)[]          | The constants exposed by the program.                                                                                                 |
| `plugins`      | [`PluginNode`](./PluginNode.md)[] _(optional)_ | Namespaced plugins with custom structured data. The universal extension point for renderer-specific or not-yet-standardised metadata. |

## Examples

### Create a program node from an input object

```typescript
const node = programNode({
    name: 'counter',
    publicKey: '7ovtg4pFqjQdSwFAUCu8gTnh5thZHzAyJFXy3Ssnj3yK',
    version: '1.42.6',
    accounts: [],
    instructions: [],
    definedTypes: [],
    pdas: [],
    events: [],
    errors: [],
});
```
