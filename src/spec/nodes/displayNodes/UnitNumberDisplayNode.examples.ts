import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A fixed-point amount with its mint as unit',
        code(
            'typescript',
            `
fixedPointTypeNode(integerTypeNode('u64'), {
    display: unitNumberDisplayNode({ unit: injectedValueNode({ key: 'mint' }) }),
    scale: 9,
});

// 1_100_000_000 with the wrapped SOL mint injected => "1.1 SOL" when the renderer names the mint
`,
        ),
    ),
    example(
        'A float labelled with a contextual unit',
        code(
            'typescript',
            `
floatTypeNode('f64', {
    display: unitNumberDisplayNode({ unit: injectedValueNode({ key: 'currency' }) }),
});
`,
        ),
    ),
];
