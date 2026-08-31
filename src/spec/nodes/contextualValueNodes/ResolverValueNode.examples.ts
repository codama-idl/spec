import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a resolver value node from a name and options',
        code(
            'typescript',
            `
const node = resolverValueNode('resolveCustomTokenProgram', {
    docs: [
        'If the mint account has more than 0 decimals and the ',
        'delegated amount is greater than zero, then we use our ',
        'own custom token program. Otherwise, we use Token 2022.',
    ],
    dependsOn: [accountValueNode('mint'), argumentValueNode('delegatedAmount')],
});
`,
        ),
    ),
];
