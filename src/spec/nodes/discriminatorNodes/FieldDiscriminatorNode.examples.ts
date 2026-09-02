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
            identifier: 'discriminator',
            type: integerTypeNode('u32'),
            defaultValue: integerValueNode('42'),
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
        'An instruction distinguished by an 8-byte data field at offset 0',
        code(
            'typescript',
            `
instructionNode({
    data: structTypeNode([
        structFieldTypeNode({
            identifier: 'discriminator',
            type: bytesTypeNode({ transforms: [fixedSizeTransformNode(8)] }),
            defaultValue: bytesValueNode('base16', '0011223344556677'),
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
];
