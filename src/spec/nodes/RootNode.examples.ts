import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'A root node with a single program',
        code(
            'typescript',
            `
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
`,
        ),
    ),
];
