import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'Create a defined type node from an input object',
        code(
            'typescript',
            `
const node = definedTypeNode({
    identifier: 'person',
    docs: ['This type describes a Person.'],
    type: structTypeNode([
        structFieldTypeNode({ identifier: 'name', type: stringTypeNode('utf8') }),
        structFieldTypeNode({ identifier: 'age', type: integerTypeNode('u8') }),
    ]),
});
`,
        ),
    ),
];
