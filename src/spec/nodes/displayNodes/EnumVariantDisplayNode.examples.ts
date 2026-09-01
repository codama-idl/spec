import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Relabelling a struct variant',
        code(
            'typescript',
            `
enumVariantTypeNode(
    'buy',
    structTypeNode([structFieldTypeNode({ identifier: 'amount', type: numberTypeNode('u64') })]),
    { display: enumVariantDisplayNode({ label: 'Buy' }) },
);
`,
        ),
    ),
    example(
        'Hiding a tuple payload so only the label is shown',
        code(
            'typescript',
            `
enumVariantTypeNode('increment', tupleTypeNode([numberTypeNode('u64')]), {
    display: enumVariantDisplayNode({ label: 'Increment', skipInnerData: true }),
});
`,
        ),
    ),
];
