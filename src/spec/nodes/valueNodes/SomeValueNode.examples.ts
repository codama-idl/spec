import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a some value node from a value node',
        code(
            'typescript',
            `
const node = someValueNode(numberValueNode(42));
`,
        ),
    ),
];
