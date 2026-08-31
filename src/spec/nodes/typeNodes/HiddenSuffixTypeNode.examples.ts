import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a hidden suffix type node from a type node and constant value nodes',
        code(
            'typescript',
            `
const node = hiddenSuffixTypeNode(numberTypeNode('u32'), [
    constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ffff')),
]);
`,
        ),
    ),
    example(
        'A number suffixed with 0xFFFF',
        code(
            'typescript',
            `
hiddenSuffixTypeNode(numberTypeNode('u32'), [constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ffff'))]);

// 42 => 0x2A000000FFFF
`,
        ),
    ),
    example(
        'A fixed UTF-8 string suffixed with "Hello"',
        code(
            'typescript',
            `
hiddenSuffixTypeNode(fixedSizeTypeNode(stringTypeNode('utf8'), 10), [
    constantValueNode(stringTypeNode('utf8'), stringValueNode('Hello')),
]);

// World => 0x576F726C64000000000048656c6c6F
`,
        ),
    ),
];
