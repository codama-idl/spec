import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a field discriminator node from a field name and an optional offset',
        code(
            'typescript',
            `
const node = fieldDiscriminatorNode('accountState', 64);
`,
        ),
    ),
    example(
        'An account distinguished by a u32 field at offset 0',
        code(
            'typescript',
            `
accountNode({
    data: structTypeNode([
        structFieldTypeNode({
            name: 'discriminator',
            type: numberTypeNode('u32'),
            defaultValue: numberValueNode(42),
            defaultValueStrategy: 'omitted',
        }),
        // ...
    ]),
    discriminators: [fieldDiscriminatorNode('discriminator')],
    // ...
});
`,
        ),
    ),
    example(
        'An instruction distinguished by an 8-byte argument at offset 0',
        code(
            'typescript',
            `
instructionNode({
    arguments: [
        instructionArgumentNode({
            name: 'discriminator',
            type: bytesTypeNode({ transforms: [fixedSizeTransformNode(8)] }),
            defaultValue: bytesValueNode('base16', '0011223344556677'),
            defaultValueStrategy: 'omitted',
        }),
        // ...
    ],
    discriminators: [fieldDiscriminatorNode('discriminator')],
    // ...
});
`,
        ),
    ),
];
