import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A relative post-offset (the default strategy)',
        code(
            'typescript',
            `
numberTypeNode('u32', { transforms: [postOffsetTransformNode(2)] });
`,
        ),
    ),
    example(
        'An absolute post-offset from the end of the buffer',
        code(
            'typescript',
            `
numberTypeNode('u32', { transforms: [postOffsetTransformNode(-2, 'absolute')] });
`,
        ),
    ),
    example(
        'A right-padded u32 number',
        code(
            'typescript',
            `
numberTypeNode('u32', { transforms: [postOffsetTransformNode(4, 'padded')] });

// 42 => 0x2A00000000000000
`,
        ),
    ),
    example(
        'A u32 number overwritten by a u16 number',
        code(
            'typescript',
            `
tupleTypeNode([numberTypeNode('u32', { transforms: [postOffsetTransformNode(-2)] }), numberTypeNode('u16')]);

// [1, 2]           => 0x01000200
// [0xFFFFFFFF, 42] => 0xFFFF2A00
`,
        ),
    ),
];
