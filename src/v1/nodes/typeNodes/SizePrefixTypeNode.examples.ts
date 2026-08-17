import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A UTF-8 string prefixed with a u16 size',
        code(
            'typescript',
            `
sizePrefixTypeNode(stringTypeNode('utf8'), numberTypeNode('u16'));

// ""      => 0x0000
// "Hello" => 0x050048656C6C6F
`,
        ),
    ),
];
