import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A UTF-8 string terminated by 0xFF',
        code(
            'typescript',
            `
sentinelTypeNode(stringTypeNode('utf8'), constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'ff')));

// Hello => 0x48656C6C6FFF
`,
        ),
    ),
];
