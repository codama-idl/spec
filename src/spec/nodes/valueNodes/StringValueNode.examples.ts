import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a string value node from a string',
        code(
            'typescript',
            `
const node = stringValueNode('Hello');
`,
        ),
    ),
];
