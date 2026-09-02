import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a constant value node from a type and a value node',
        code(
            'typescript',
            `
const node = constantValueNode(integerTypeNode('u32'), integerValueNode('42'));
`,
        ),
    ),
    example(
        'A UTF-8 string constant',
        code(
            'typescript',
            `
constantValueNodeFromString('utf8', 'Hello');

// Equivalent to:
constantValueNode(stringTypeNode('utf8'), stringValueNode('Hello'));
`,
        ),
    ),
    example(
        'A base16 bytes constant',
        code(
            'typescript',
            `
constantValueNodeFromBytes('base16', 'FF99CC');

// Equivalent to:
constantValueNode(bytesTypeNode(), bytesValueNode('base16', 'FF99CC'));
`,
        ),
    ),
];
