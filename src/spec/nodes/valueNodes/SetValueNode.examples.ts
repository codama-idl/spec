import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a set value node from value nodes',
        code(
            'typescript',
            `
const node = setValueNode([integerValueNode('1'), integerValueNode('2'), integerValueNode('3')]);
`,
        ),
    ),
];
