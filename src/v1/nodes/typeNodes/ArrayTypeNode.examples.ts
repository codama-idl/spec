import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an array type node from a type node and a count node',
        code(
            'typescript',
            `
const node = arrayTypeNode(publicKeyTypeNode(), prefixedCountNode(numberTypeNode('u32')));
`,
        ),
    ),
    example(
        'u32 prefixed array of u8 numbers',
        code(
            'typescript',
            `
arrayTypeNode(numberTypeNode('u8'), prefixedCountNode(numberTypeNode('u32')));

// [1, 2, 3] => 0x03000000010203
`,
        ),
    ),
];
