import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a constant discriminator node from a constant value and an optional offset',
        code(
            'typescript',
            `
const node = constantDiscriminatorNode(constantValueNode(stringTypeNode('utf8'), stringValueNode('Hello')), 64);
`,
        ),
    ),
    example(
        'An account distinguished by a u32 number equal to 42 at offset 0',
        code(
            'typescript',
            `
accountNode({
    discriminators: [constantDiscriminatorNode(constantValueNode(integerTypeNode('u32'), integerValueNode('42')))],
    // ...
});
`,
        ),
    ),
    example(
        'An instruction distinguished by an 8-byte hash at offset 0',
        code(
            'typescript',
            `
instructionNode({
    discriminators: [
        constantDiscriminatorNode(constantValueNode(bytesTypeNode(), bytesValueNode('base16', '0011223344556677'))),
    ],
    // ...
});
`,
        ),
    ),
];
