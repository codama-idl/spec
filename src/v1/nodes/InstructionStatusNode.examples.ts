import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'A live instruction (no status needed)',
        code(
            'typescript',
            `
instructionNode({
    name: 'transfer',
    accounts: [...],
    arguments: [...],
});
`,
        ),
    ),
    example(
        'A deprecated instruction',
        code(
            'typescript',
            `
instructionNode({
    name: 'oldTransfer',
    status: instructionStatusNode('deprecated', 'Use the \`transfer\` instruction instead. This will be removed in v3.0.0.'),
    accounts: [...],
    arguments: [...],
});
`,
        ),
    ),
    example(
        'An archived instruction',
        code(
            'typescript',
            `
instructionNode({
    name: 'legacyTransfer',
    status: instructionStatusNode('archived', 'This instruction was removed in v2.0.0. It is kept here for historical parsing.'),
    accounts: [...],
    arguments: [...],
});
`,
        ),
    ),
    example(
        'A draft instruction',
        code(
            'typescript',
            `
instructionNode({
    name: 'experimentalFeature',
    status: instructionStatusNode('draft', 'This instruction is under development and may change.'),
    accounts: [...],
    arguments: [...],
});
`,
        ),
    ),
    example(
        'Status without a message',
        code(
            'typescript',
            `
instructionNode({
    name: 'someInstruction',
    status: instructionStatusNode('deprecated'),
    accounts: [...],
    arguments: [...],
});
`,
        ),
    ),
];
