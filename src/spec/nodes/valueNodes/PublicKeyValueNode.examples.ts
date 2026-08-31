import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a public key value node from a base58 public key',
        code(
            'typescript',
            `
const node = publicKeyValueNode('7rA1KcBdW5hKmMasQdRVBFsD6T1nLtYuR6y59TJNgevR');
`,
        ),
    ),
];
