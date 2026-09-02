import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A little-endian f64',
        code(
            'typescript',
            `
const node = floatTypeNode('f64');

// 1.5 => 0x000000000000F83F
`,
        ),
    ),
    example(
        'A float denoting a quantity',
        code(
            'typescript',
            `
floatTypeNode('f64', { unit: 'USD' });
`,
        ),
    ),
];
