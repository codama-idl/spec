import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a hidden prefix type node from a type node and constant value nodes',
        code(
            'typescript',
            `
const node = hiddenPrefixTypeNode(numberTypeNode('u32'), [
    constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ffff')),
]);
`,
        ),
    ),
    example(
        'A number prefixed with 0xFFFF',
        code(
            'typescript',
            `
hiddenPrefixTypeNode(numberTypeNode('u32'), [constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ffff'))]);

// 42 => 0xFFFF2A000000
`,
        ),
    ),
    example(
        'A fixed UTF-8 string prefixed with "Hello"',
        code(
            'typescript',
            `
hiddenPrefixTypeNode(fixedSizeTypeNode(stringTypeNode('utf8'), 10), [
    constantValueNode(stringTypeNode('utf8'), stringValueNode('Hello')),
]);

// World => 0x48656C6C6F576F726C640000000000
`,
        ),
    ),
];
