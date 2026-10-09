import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Labelling a sentinel amount',
        code(
            'typescript',
            `
structFieldTypeNode({
    identifier: 'amount',
    type: integerTypeNode('u64', {
        display: amountNumberDisplayNode({ decimals: injectedValueNode({ key: 'decimals' }) }),
    }),
    display: structFieldDisplayNode({
        label: 'Amount',
        valueLabels: [valueLabelDisplayNode({ value: integerValueNode('18446744073709551615'), label: 'All' })],
    }),
});

// u64::MAX => "All", any other amount => e.g. "1.5"
`,
        ),
    ),
    example(
        'Labelling an absent optional value',
        code(
            'typescript',
            `
structFieldTypeNode({
    identifier: 'amount',
    type: optionTypeNode(
        integerTypeNode('u64', {
            display: amountNumberDisplayNode({ decimals: integerValueNode('9'), unit: stringValueNode('SOL') }),
        }),
    ),
    display: structFieldDisplayNode({
        valueLabels: [valueLabelDisplayNode({ value: noneValueNode(), label: 'all SOL' })],
    }),
});

// None => "Unwrap all SOL from …", Some(1500000000) => "Unwrap 1.5 SOL from …"
`,
        ),
    ),
];
