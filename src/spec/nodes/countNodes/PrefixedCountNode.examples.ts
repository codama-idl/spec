import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a prefixed count node from a number node',
        code(
            'typescript',
            `
const node = prefixedCountNode(integerTypeNode('u32'));
`,
        ),
    ),
    example(
        'A variable array of public keys prefixed with a u32',
        code(
            'typescript',
            `
arrayTypeNode(publicKeyTypeNode(), prefixedCountNode(integerTypeNode('u32')));
`,
        ),
    ),
];
