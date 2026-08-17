import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a map entry value node from a key and a value',
        code(
            'typescript',
            `
const node = mapEntryValueNode(stringValueNode('total'), numberValueNode(42));
`,
        ),
    ),
];
