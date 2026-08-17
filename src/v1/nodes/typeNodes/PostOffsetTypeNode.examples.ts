import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A relative post-offset (the default strategy)',
        code(
            'typescript',
            `
postOffsetTypeNode(numberTypeNode('u32'), 2);
`,
        ),
    ),
    example(
        'An absolute post-offset from the end of the buffer',
        code(
            'typescript',
            `
postOffsetTypeNode(numberTypeNode('u32'), -2, 'absolute');
`,
        ),
    ),
    example(
        'A right-padded u32 number',
        code(
            'typescript',
            `
postOffsetTypeNode(numberTypeNode('u32'), 4, 'padded');

// 42 => 0x2A00000000000000
`,
        ),
    ),
    example(
        'A u32 number overwritten by a u16 number',
        code(
            'typescript',
            `
tupleTypeNode([postOffsetTypeNode(numberTypeNode('u32'), -2), numberTypeNode('u16')]);

// [1, 2]           => 0x01000200
// [0xFFFFFFFF, 42] => 0xFFFF2A00
`,
        ),
    ),
];
