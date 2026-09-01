import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'An optional account',
        code(
            'typescript',
            `
instructionAccountNode({
    identifier: 'freezeAuthority',
    isWritable: false,
    isSigner: false,
    isOptional: true,
    docs: ['The freeze authority to set on the asset, if any.'],
});
`,
        ),
    ),
    example(
        'An optional signer account',
        code(
            'typescript',
            `
instructionAccountNode({
    identifier: 'owner',
    isWritable: true,
    isSigner: 'either',
    docs: ['The owner of the asset. The owner must only sign the transaction if the asset is being updated.'],
});
`,
        ),
    ),
];
