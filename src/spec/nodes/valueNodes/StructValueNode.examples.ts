import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a struct value node from field value nodes',
        code(
            'typescript',
            `
const node = structValueNode([
    structFieldValueNode('name', stringValueNode('Alice')),
    structFieldValueNode('age', integerValueNode('42')),
]);
`,
        ),
    ),
];
