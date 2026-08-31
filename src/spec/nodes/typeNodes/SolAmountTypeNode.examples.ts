import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'u64 Solana amounts',
        code(
            'typescript',
            `
solAmountTypeNode(numberTypeNode('u64'));

// 1.5 SOL => 0x002F685900000000
// 300 SOL => 0x00B864D945000000
`,
        ),
    ),
];
