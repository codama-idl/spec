import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a string type node from an encoding',
        code(
            'typescript',
            `
const node = stringTypeNode('utf8');
`,
        ),
    ),
];
