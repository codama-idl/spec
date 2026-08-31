import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a bytes value node from an encoding and data',
        code(
            'typescript',
            `
const node = bytesValueNode('base16', '010203');
const utf8Node = bytesValueNode('utf8', 'Hello');
`,
        ),
    ),
];
