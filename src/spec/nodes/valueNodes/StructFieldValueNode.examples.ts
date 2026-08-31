import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a struct field value node from a name and a value',
        code(
            'typescript',
            `
const node = structFieldValueNode('age', numberValueNode(42));
`,
        ),
    ),
];
