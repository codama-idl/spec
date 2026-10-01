import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an enum value node from an enum, a variant, and an optional value',
        code(
            'typescript',
            `
const node = enumValueNode('myEnum', 'myVariant');
const nodeWithExplicitEnum = enumValueNode(definedTypeLinkNode('myEnum'), 'myVariant');

const nodeWithData = enumValueNode(
    'myEnum',
    'myVariantWithData',
    structValueNode([
        structFieldValueNode('name', stringValueNode('Alice')),
        structFieldValueNode('age', integerValueNode('42')),
    ]),
);

// The payload is any value matching the variant's data type, here an integer.
const nodeWithAmount = enumValueNode('operation', 'amount', integerValueNode('42'));
`,
        ),
    ),
];
