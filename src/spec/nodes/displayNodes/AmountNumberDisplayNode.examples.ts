import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Decimals and unit injected from surrounding account state',
        code(
            'typescript',
            `
integerTypeNode('u64', {
    display: amountNumberDisplayNode({
        decimals: injectedValueNode({ key: 'decimals' }),
        unit: injectedValueNode({ key: 'symbol' }),
    }),
});

// 1_500_000 with injected decimals 6 and symbol "USDC" => "1.5 USDC"
`,
        ),
    ),
    example(
        'An injected scale with a static fallback',
        code(
            'typescript',
            `
// Static scale and unit belong on the type instead — see fixedPointTypeNode.
integerTypeNode('u64', {
    display: amountNumberDisplayNode({
        decimals: injectedValueNode({ key: 'decimals', fallback: integerValueNode('0') }),
        unit: injectedValueNode({ key: 'symbol' }),
    }),
});
`,
        ),
    ),
];
