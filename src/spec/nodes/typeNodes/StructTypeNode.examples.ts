import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        "A struct storing a person's name and age",
        code(
            'typescript',
            `
structTypeNode([
    structFieldTypeNode({ identifier: 'name', type: stringTypeNode('utf8', { transforms: [fixedSizeTransformNode(10)] }) }),
    structFieldTypeNode({ identifier: 'age', type: integerTypeNode('u8') }),
]);

// { name: Alice, age: 42 } => 0x416C69636500000000002A
`,
        ),
    ),
];
