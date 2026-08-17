import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Relabelling a struct variant',
        code(
            'typescript',
            `
enumStructVariantTypeNode(
    'buy',
    structTypeNode([structFieldTypeNode({ name: 'amount', type: numberTypeNode('u64') })]),
    undefined,
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
enumTupleVariantTypeNode(
    'increment',
    tupleTypeNode([numberTypeNode('u64')]),
    undefined,
    { display: enumVariantDisplayNode({ label: 'Increment', skipInnerData: true }) },
);
`,
        ),
    ),
];
