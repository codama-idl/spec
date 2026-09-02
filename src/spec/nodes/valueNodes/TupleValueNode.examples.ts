import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a tuple value node from value nodes',
        code(
            'typescript',
            `
const node = tupleValueNode([stringValueNode('Alice'), integerValueNode('42')]);
`,
        ),
    ),
];
