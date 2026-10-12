import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Decimals and unit provided by the mint account of an instruction',
        code(
            'typescript',
            `
instructionNode({
    identifier: 'transfer',
    accounts: [
        instructionAccountNode({
            identifier: 'mint',
            isSigner: false,
            isWritable: false,
            accountLink: accountLinkNode('mint'),
        }),
    ],
    provides: [
        providedNode('decimals', accountDataValueNode('mint', 'decimals')),
        providedNode('mint', accountValueNode('mint')),
    ],
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'amount',
            type: integerTypeNode('u64', {
                display: amountNumberDisplayNode({
                    decimals: injectedValueNode({ key: 'decimals' }),
                    unit: injectedValueNode({ key: 'mint' }),
                }),
            }),
        }),
    ]),
});

// 1_500_000 with the USDC mint => "1.5 USDC",
// or "1.5 EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" when the renderer knows no name for the mint
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
    example(
        'A literal address unit',
        code(
            'typescript',
            `
integerTypeNode('u64', {
    display: amountNumberDisplayNode({
        decimals: integerValueNode('6'),
        unit: publicKeyValueNode('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    }),
});

// 1_500_000 => "1.5 USDC" when the renderer names the USDC mint
`,
        ),
    ),
];
