import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A little-endian u64',
        code(
            'typescript',
            `
const node = integerTypeNode('u64');

// 42 => 0x2A00000000000000
`,
        ),
    ),
    example(
        'A big-endian i32',
        code(
            'typescript',
            `
integerTypeNode('i32', { endian: 'be' });

// -42 => 0xFFFFFFD6
`,
        ),
    ),
    example(
        'An integer denoting a quantity',
        code(
            'typescript',
            `
integerTypeNode('u64', { unit: 'slots' });
`,
        ),
    ),
    example(
        'A Solana compact-u16',
        code(
            'typescript',
            `
integerTypeNode('shortU16');

// 42    => 0x2A
// 26742 => 0xF6D0
`,
        ),
    ),
];
