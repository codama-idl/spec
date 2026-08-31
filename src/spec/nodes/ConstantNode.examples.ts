import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'Numeric Constant',
        code(
            'typescript',
            `
const node = constantNode('maxSize', numberTypeNode('u32'), numberValueNode(100));
`,
        ),
    ),
    example(
        'Bytes Constant',
        code(
            'typescript',
            `
const node = constantNode('seedPrefix', bytesTypeNode(), bytesValueNode('base16', '74657374'));
`,
        ),
    ),
    example(
        'With Documentation',
        code(
            'typescript',
            `
const node = constantNode('maxItems', numberTypeNode('u64'), numberValueNode(1000), [
    'The maximum number of items allowed.',
]);
`,
        ),
    ),
];
