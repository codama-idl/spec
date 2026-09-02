import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an array value node from value nodes',
        code(
            'typescript',
            `
const node = arrayValueNode([integerValueNode('1'), integerValueNode('2'), integerValueNode('3')]);
`,
        ),
    ),
];
