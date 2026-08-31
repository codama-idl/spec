import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a boolean value node from a boolean',
        code(
            'typescript',
            `
const node = booleanValueNode(true);
`,
        ),
    ),
];
