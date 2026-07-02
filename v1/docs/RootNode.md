# `RootNode`

The root of a Codama IDL document. Pairs a primary program with any number of additional programs and tags the document with the spec version.

## Attributes

### Data

| Attribute  | Type           | Description                                                |
| ---------- | -------------- | ---------------------------------------------------------- |
| `kind`     | `"rootNode"`   | The node discriminator.                                    |
| `standard` | `"codama"`     | A literal marker identifying the document as a Codama IDL. |
| `version`  | `SemverString` | The Codama spec version this document conforms to.         |

### Children

| Attribute            | Type                                | Description                                            |
| -------------------- | ----------------------------------- | ------------------------------------------------------ |
| `program`            | [`ProgramNode`](./ProgramNode.md)   | The primary program described by the document.         |
| `additionalPrograms` | [`ProgramNode`](./ProgramNode.md)[] | Additional programs referenced by the primary program. |
