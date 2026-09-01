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
        structFieldTypeNode({ identifier: 'x', type: numberTypeNode('u32') }),
        structFieldTypeNode({ identifier: 'y', type: numberTypeNode('u32') }),
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
enumVariantTypeNode('coordinates', tupleTypeNode([numberTypeNode('u32'), numberTypeNode('u32')]));
`,
        ),
    ),
    example(
        'A variant carrying a single type — no tuple needed',
        code(
            'typescript',
            `
enumVariantTypeNode('amount', numberTypeNode('u64'));
`,
        ),
    ),
];
