import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'A root node with a single program',
        code(
            'typescript',
            `
const node = rootNode(
    programNode({
        identifier: 'counter',
        publicKey: '2R3Ui2TVUUCyGcZdopxJauk8ZBzgAaHHZCVUhm5ifPaC',
        version: '1.0.0',
        accounts: [
            accountNode({
                identifier: 'counter',
                data: structTypeNode([
                    structFieldTypeNode({ identifier: 'authority', type: publicKeyTypeNode() }),
                    structFieldTypeNode({ identifier: 'value', type: numberTypeNode('u32') }),
                ]),
            }),
        ],
        instructions: [
            instructionNode({ identifier: 'create' /* ... */ }),
            instructionNode({ identifier: 'increment' /* ... */ }),
            instructionNode({ identifier: 'transferAuthority' /* ... */ }),
            instructionNode({ identifier: 'delete' /* ... */ }),
        ],
    }),
);
`,
        ),
    ),
];
