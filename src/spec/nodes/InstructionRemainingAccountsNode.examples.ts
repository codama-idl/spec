import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'Optional remaining signers',
        code(
            'typescript',
            `
instructionRemainingAccountsNode('authorities', {
    isSigner: true,
    isOptional: true,
});
`,
        ),
    ),
    example(
        'Remaining accounts that may or may not be signers',
        code(
            'typescript',
            `
instructionRemainingAccountsNode('authorities', {
    isSigner: 'either',
});
`,
        ),
    ),
    example(
        'Remaining accounts auto-filled by a renderer plugin',
        code(
            'typescript',
            `
// The identifier honestly declares a client input; renderers with a matching
// plugin may fill it automatically, others expose it as a plain input.
instructionRemainingAccountsNode('authorities', {
    isSigner: true,
    docs: ['Provide authorities as remaining accounts if and only if the asset has a multisig set up.'],
    plugins: [
        pluginNode('codama.jsResolver', {
            payload: { function: 'resolveTransferRemainingAccounts', dependsOn: ['data.hasMultisig'] },
        }),
    ],
});
`,
        ),
    ),
];
