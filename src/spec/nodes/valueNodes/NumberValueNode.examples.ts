import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a number value node from a number',
        code(
            'typescript',
            `
const node = numberValueNode(42);
`,
        ),
    ),
];
