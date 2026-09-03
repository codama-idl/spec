import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a float value node from a string',
        code(
            'typescript',
            `
const node = floatValueNode('1.5');
`,
        ),
    ),
    example(
        'A default value for an f64 field',
        code(
            'typescript',
            `
structFieldTypeNode({
    identifier: 'exchangeRate',
    type: floatTypeNode('f64'),
    defaultValue: floatValueNode('1'),
});
`,
        ),
    ),
];
