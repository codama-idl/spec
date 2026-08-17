import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a PDA seed value node from a name and a value',
        code(
            'typescript',
            `
const node = pdaSeedValueNode('mint', accountValueNode('mint'));
`,
        ),
    ),
];
