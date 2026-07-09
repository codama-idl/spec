import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A fixed 9-decimal SOL amount',
        code(
            'typescript',
            `
numberTypeNode('u64', 'le', {
    display: amountNumberDisplayNode({ decimals: numberValueNode(9), unit: stringValueNode('SOL') }),
});

// 1_100_000_000 => "1.1 SOL"
`,
        ),
    ),
    example(
        'Decimals and unit injected from surrounding account state',
        code(
            'typescript',
            `
numberTypeNode('u64', 'le', {
    display: amountNumberDisplayNode({
        decimals: injectedValueNode({ key: 'decimals' }),
        unit: injectedValueNode({ key: 'symbol' }),
    }),
});

// 1_500_000 with injected decimals 6 and symbol "USDC" => "1.5 USDC"
`,
        ),
    ),
];
