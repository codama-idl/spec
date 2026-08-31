import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a set value node from value nodes',
        code(
            'typescript',
            `
const node = setValueNode([numberValueNode(1), numberValueNode(2), numberValueNode(3)]);
`,
        ),
    ),
];
