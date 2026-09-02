import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A number prefixed with 0xFFFF',
        code(
            'typescript',
            `
integerTypeNode('u32', {
    transforms: [hiddenPrefixTransformNode([constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ffff'))])],
});

// 42 => 0xFFFF2A000000
`,
        ),
    ),
    example(
        'A fixed UTF-8 string prefixed with "Hello"',
        code(
            'typescript',
            `
stringTypeNode('utf8', {
    transforms: [
        fixedSizeTransformNode(10),
        hiddenPrefixTransformNode([constantValueNode(stringTypeNode('utf8'), stringValueNode('Hello'))]),
    ],
});

// World => 0x48656C6C6F576F726C640000000000
`,
        ),
    ),
];
