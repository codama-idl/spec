import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'Optional remaining signers',
        code(
            'typescript',
            `
instructionRemainingAccountsNode(argumentValueNode('authorities'), {
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
instructionRemainingAccountsNode(argumentValueNode('authorities'), {
    isSigner: 'either',
});
`,
        ),
    ),
    example(
        'Remaining accounts using a resolver',
        code(
            'typescript',
            `
instructionRemainingAccountsNode(
    resolverValueNode('resolveTransferRemainingAccounts', {
        docs: ['Provide authorities as remaining accounts if and only if the asset has a multisig set up.'],
        dependsOn: [argumentValueNode('hasMultisig'), argumentValueNode('authorities')],
    }),
);
`,
        ),
    ),
];
