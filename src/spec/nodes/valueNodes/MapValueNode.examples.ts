import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a map value node from entries',
        code(
            'typescript',
            `
const node = mapValueNode([
    mapEntryValueNode(stringValueNode('apples'), numberValueNode(12)),
    mapEntryValueNode(stringValueNode('bananas'), numberValueNode(34)),
    mapEntryValueNode(stringValueNode('carrots'), numberValueNode(56)),
]);
`,
        ),
    ),
];
