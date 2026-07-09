import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Displaying the whole string',
        code(
            'typescript',
            `
stringTypeNode('utf8', { display: stringDisplayNode({}) });

// "SOLANA" => "SOLANA"
`,
        ),
    ),
    example(
        'Displaying a leading slice',
        code(
            'typescript',
            `
stringTypeNode('utf8', { display: stringDisplayNode({ sliceStart: 0, sliceEnd: 3 }) });

// "SOLANA" => "SOL"
`,
        ),
    ),
];
