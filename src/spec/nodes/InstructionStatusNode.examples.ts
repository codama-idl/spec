import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'A deprecated status with migration guidance',
        code(
            'typescript',
            `
instructionStatusNode('deprecated', 'Use the \`transfer\` instruction instead. This will be removed in v3.0.0.');
`,
        ),
    ),
    example(
        'A status without a message',
        code(
            'typescript',
            `
instructionStatusNode('archived');
`,
        ),
    ),
    example(
        'Attaching a status to an instruction',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'experimentalFeature',
    status: instructionStatusNode('draft', 'This instruction is under development and may change.'),
    // ...
});
`,
        ),
    ),
];
