import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a size discriminator node from a size',
        code(
            'typescript',
            `
const node = sizeDiscriminatorNode(165);
`,
        ),
    ),
    example(
        'An account distinguished by its size being equal to 42',
        code(
            'typescript',
            `
accountNode({
    discriminators: [sizeDiscriminatorNode(42)],
    // ...
});
`,
        ),
    ),
    example(
        'An instruction distinguished by its size being equal to 42',
        code(
            'typescript',
            `
instructionNode({
    discriminators: [sizeDiscriminatorNode(42)],
    // ...
});
`,
        ),
    ),
];
