import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A unit variant — no data',
        code(
            'typescript',
            `
const node = enumVariantTypeNode('uninitialized');
`,
        ),
    ),
    example(
        'A struct variant — named fields',
        code(
            'typescript',
            `
enumVariantTypeNode(
    'move',
    structTypeNode([
        structFieldTypeNode({ identifier: 'x', type: integerTypeNode('u32') }),
        structFieldTypeNode({ identifier: 'y', type: integerTypeNode('u32') }),
    ]),
);
`,
        ),
    ),
    example(
        'A tuple variant — positional fields',
        code(
            'typescript',
            `
enumVariantTypeNode('coordinates', tupleTypeNode([integerTypeNode('u32'), integerTypeNode('u32')]));
`,
        ),
    ),
    example(
        'A variant carrying a single type — no tuple needed',
        code(
            'typescript',
            `
enumVariantTypeNode('amount', integerTypeNode('u64'));
`,
        ),
    ),
];
