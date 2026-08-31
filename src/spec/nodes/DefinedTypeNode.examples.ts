import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'Create a defined type node from an input object',
        code(
            'typescript',
            `
const node = definedTypeNode({
    name: 'person',
    docs: ['This type describes a Person.'],
    type: structTypeNode([
        structFieldTypeNode({ name: 'name', type: stringTypeNode('utf8') }),
        structFieldTypeNode({ name: 'age', type: numberTypeNode('u8') }),
    ]),
});
`,
        ),
    ),
];
