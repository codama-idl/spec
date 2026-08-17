import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'An intent label plus an interpolated sentence',
        code(
            'typescript',
            `
instructionNode({
    name: 'transferChecked',
    display: instructionDisplayNode({
        intent: 'Transfer',
        interpolatedIntent: 'Transfer \${data.amount} to \${accounts.destination}',
    }),
    // ...accounts and arguments
});

// intent      => "Transfer"
// interpolated => "Transfer 1.5 USDC to 3Wnd5…5PxJX"
`,
        ),
    ),
    example(
        'An intent label only, letting the renderer build the fallback list',
        code(
            'typescript',
            `
instructionNode({
    name: 'closeAccount',
    display: instructionDisplayNode({ intent: 'Close Account' }),
    // ...accounts and arguments
});
`,
        ),
    ),
];
