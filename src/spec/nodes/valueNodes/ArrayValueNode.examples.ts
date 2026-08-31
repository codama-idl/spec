import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an array value node from value nodes',
        code(
            'typescript',
            `
const node = arrayValueNode([numberValueNode(1), numberValueNode(2), numberValueNode(3)]);
`,
        ),
    ),
];
