import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Relabelling an account in the fallback list',
        code(
            'typescript',
            `
instructionAccountNode({
    name: 'destination',
    isSigner: false,
    isWritable: true,
    display: instructionAccountDisplayNode({ label: 'To' }),
});
`,
        ),
    ),
    example(
        'Hiding an account once its value is surfaced elsewhere',
        code(
            'typescript',
            `
instructionAccountNode({
    name: 'mint',
    isSigner: false,
    isWritable: false,
    display: instructionAccountDisplayNode({ label: 'Token Mint', skip: 'whenInjected' }),
});
`,
        ),
    ),
];
