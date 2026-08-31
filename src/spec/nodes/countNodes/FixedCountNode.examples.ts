import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a fixed count node from a number',
        code(
            'typescript',
            `
const node = fixedCountNode(42);
`,
        ),
    ),
    example(
        'An array of three public keys',
        code(
            'typescript',
            `
arrayTypeNode(publicKeyTypeNode(), fixedCountNode(3));
`,
        ),
    ),
];
