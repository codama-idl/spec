# RootNode

The root of a Codama IDL.
Pairs a primary program with any number of additional programs and tags the IDL with the spec version.

![Diagram](https://github.com/codama-idl/codama/assets/3642397/96c43c75-5925-4b6b-a1e0-8b8c61317cfe)

## Attributes

### Data

| Attribute  | Type           | Description                                                                                                                                       |
| ---------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`     | `"rootNode"`   | The node discriminator.                                                                                                                           |
| `standard` | `"codama"`     | A literal marker identifying the JSON object as a Codama IDL. This allows other communities to fork the Codama standard under a different marker. |
| `version`  | `SemverString` | The Codama spec version this IDL conforms to.                                                                                                     |

### Children

| Attribute            | Type                                | Description                                            |
| -------------------- | ----------------------------------- | ------------------------------------------------------ |
| `program`            | [`ProgramNode`](./ProgramNode.md)   | The primary program described by the IDL.              |
| `additionalPrograms` | [`ProgramNode`](./ProgramNode.md)[] | Additional programs referenced by the primary program. |

## Examples

### A root node with a single program

```typescript
const node = rootNode(
    programNode({
        name: 'counter',
        publicKey: '2R3Ui2TVUUCyGcZdopxJauk8ZBzgAaHHZCVUhm5ifPaC',
        version: '1.0.0',
        accounts: [
            accountNode({
                name: 'counter',
                data: structTypeNode([
                    structFieldTypeNode({ name: 'authority', type: publicKeyTypeNode() }),
                    structFieldTypeNode({ name: 'value', type: numberTypeNode('u32') }),
                ]),
            }),
        ],
        instructions: [
            instructionNode({ name: 'create' /* ... */ }),
            instructionNode({ name: 'increment' /* ... */ }),
            instructionNode({ name: 'transferAuthority' /* ... */ }),
            instructionNode({ name: 'delete' /* ... */ }),
        ],
    }),
);
```
