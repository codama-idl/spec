import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'u32 prefixed set of u8 numbers',
        code(
            'typescript',
            `
setTypeNode(integerTypeNode('u8'), prefixedCountNode(integerTypeNode('u32')));

// Set (1, 2, 3) => 0x03000000010203
`,
        ),
    ),
];
