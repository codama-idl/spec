import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A relative pre-offset (the default strategy)',
        code(
            'typescript',
            `
numberTypeNode('u32', { transforms: [preOffsetTransformNode(2)] });
`,
        ),
    ),
    example(
        'An absolute pre-offset',
        code(
            'typescript',
            `
numberTypeNode('u32', { transforms: [preOffsetTransformNode(-2, 'absolute')] });
`,
        ),
    ),
    example(
        'A left-padded u32 number',
        code(
            'typescript',
            `
numberTypeNode('u32', { transforms: [preOffsetTransformNode(4, 'padded')] });

// 42 => 0x000000002A000000
`,
        ),
    ),
    example(
        'A u32 number overwritten by a u16 number',
        code(
            'typescript',
            `
tupleTypeNode([numberTypeNode('u32'), numberTypeNode('u16', { transforms: [preOffsetTransformNode(-2)] })]);

// [1, 2]           => 0x01000200
// [0xFFFFFFFF, 42] => 0xFFFF2A00
`,
        ),
    ),
];
