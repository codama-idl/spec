import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A fixed-point amount with a per-mint symbol',
        code(
            'typescript',
            `
fixedPointTypeNode(integerTypeNode('u64'), 9, {
    display: unitNumberDisplayNode(injectedValueNode({ key: 'symbol' })),
});

// 1_100_000_000 with the injected symbol "SOL" => "1.1 SOL"
`,
        ),
    ),
    example(
        'A float labelled with a contextual unit',
        code(
            'typescript',
            `
floatTypeNode('f64', {
    display: unitNumberDisplayNode(injectedValueNode({ key: 'currency' })),
});
`,
        ),
    ),
];
