import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'Numeric Constant',
        code(
            'typescript',
            `
const node = constantNode('maxSize', integerTypeNode('u32'), integerValueNode('100'));
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
const node = constantNode('maxItems', integerTypeNode('u64'), integerValueNode('1000'), [
    'The maximum number of items allowed.',
]);
`,
        ),
    ),
];
