import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        "A tuple storing a person's name and age",
        code(
            'typescript',
            `
tupleTypeNode([stringTypeNode('utf8', { transforms: [fixedSizeTransformNode(10)] }), integerTypeNode('u8')]);

// (Alice, 42) => 0x416C69636500000000002A
`,
        ),
    ),
];
