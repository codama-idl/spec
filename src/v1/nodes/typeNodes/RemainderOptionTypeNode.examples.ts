import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'An optional UTF-8 string using remaining bytes',
        code(
            'typescript',
            `
remainderOptionTypeNode(stringTypeNode('utf8'));

// None          => 0x
// Some("Hello") => 0x48656C6C6F
`,
        ),
    ),
];
