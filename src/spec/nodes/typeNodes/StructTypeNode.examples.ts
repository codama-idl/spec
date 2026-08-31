import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        "A struct storing a person's name and age",
        code(
            'typescript',
            `
structTypeNode([
    structFieldTypeNode({ name: 'name', type: fixedSizeTypeNode(stringTypeNode('utf8'), 10) }),
    structFieldTypeNode({ name: 'age', type: numberTypeNode('u8') }),
]);

// { name: Alice, age: 42 } => 0x416C69636500000000002A
`,
        ),
    ),
];
