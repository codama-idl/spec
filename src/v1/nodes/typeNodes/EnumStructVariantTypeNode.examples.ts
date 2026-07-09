import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a struct enum variant type node from a name and a struct',
        code(
            'typescript',
            `
const node = enumStructVariantTypeNode(
    'coordinates',
    structTypeNode([
        structFieldTypeNode({ name: 'x', type: numberTypeNode('u32') }),
        structFieldTypeNode({ name: 'y', type: numberTypeNode('u32') }),
    ]),
);
`,
        ),
    ),
];
