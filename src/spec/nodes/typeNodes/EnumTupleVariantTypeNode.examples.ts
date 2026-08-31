import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a tuple enum variant type node from a name and a tuple',
        code(
            'typescript',
            `
const node = enumTupleVariantTypeNode('coordinates', tupleTypeNode([numberTypeNode('u32'), numberTypeNode('u32')]));
`,
        ),
    ),
];
