import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a map value node from entries',
        code(
            'typescript',
            `
const node = mapValueNode([
    mapEntryValueNode(stringValueNode('apples'), integerValueNode('12')),
    mapEntryValueNode(stringValueNode('bananas'), integerValueNode('34')),
    mapEntryValueNode(stringValueNode('carrots'), integerValueNode('56')),
]);
`,
        ),
    ),
];
