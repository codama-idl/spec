import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a remainder count node',
        code(
            'typescript',
            `
const node = remainderCountNode();
`,
        ),
    ),
    example(
        'A remainder array of public keys',
        code(
            'typescript',
            `
arrayTypeNode(publicKeyTypeNode(), remainderCountNode());
`,
        ),
    ),
];
