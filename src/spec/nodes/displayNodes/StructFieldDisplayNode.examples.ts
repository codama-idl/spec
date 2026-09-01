import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Relabelling an instruction argument',
        code(
            'typescript',
            `
instructionArgumentNode({
    identifier: 'amount',
    type: numberTypeNode('u64'),
    display: structFieldDisplayNode({ label: 'Amount' }),
});
`,
        ),
    ),
    example(
        'Hiding a discriminator argument from the fallback list',
        code(
            'typescript',
            `
instructionArgumentNode({
    identifier: 'discriminator',
    type: numberTypeNode('u8'),
    display: structFieldDisplayNode({ skip: 'always' }),
});
`,
        ),
    ),
    example(
        'Flattening a nested struct into its parent with a label prefix',
        code(
            'typescript',
            `
structFieldTypeNode({
    identifier: 'config',
    type: definedTypeLinkNode('config'),
    display: structFieldDisplayNode({ flatten: true, flattenPrefix: 'config.' }),
});
`,
        ),
    ),
];
