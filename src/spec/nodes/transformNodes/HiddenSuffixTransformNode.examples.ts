import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A number suffixed with 0xFFFF',
        code(
            'typescript',
            `
numberTypeNode('u32', {
    transforms: [hiddenSuffixTransformNode([constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ffff'))])],
});

// 42 => 0x2A000000FFFF
`,
        ),
    ),
    example(
        'A fixed UTF-8 string suffixed with "Hello"',
        code(
            'typescript',
            `
stringTypeNode('utf8', {
    transforms: [
        fixedSizeTransformNode(10),
        hiddenSuffixTransformNode([constantValueNode(stringTypeNode('utf8'), stringValueNode('Hello'))]),
    ],
});

// World => 0x576F726C64000000000048656c6c6F
`,
        ),
    ),
];
