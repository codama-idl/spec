import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a public key type node',
        code(
            'typescript',
            `
const node = publicKeyTypeNode();
`,
        ),
    ),
];
