import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Relabelling an instruction data field',
        code(
            'typescript',
            `
structFieldTypeNode({
    identifier: 'amount',
    type: integerTypeNode('u64'),
    display: structFieldDisplayNode({ label: 'Amount' }),
});
`,
        ),
    ),
    example(
        'Hiding a discriminator field from the fallback list',
        code(
            'typescript',
            `
structFieldTypeNode({
    identifier: 'discriminator',
    type: integerTypeNode('u8'),
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
