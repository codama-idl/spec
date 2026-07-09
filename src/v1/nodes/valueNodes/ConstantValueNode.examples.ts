import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a constant value node from a type and a value node',
        code(
            'typescript',
            `
const node = constantValueNode(numberTypeNode('u32'), numberValueNode(42));
`,
        ),
    ),
];
