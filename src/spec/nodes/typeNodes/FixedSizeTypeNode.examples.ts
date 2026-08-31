import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a fixed size type node from a type node and a byte length',
        code(
            'typescript',
            `
const node = fixedSizeTypeNode(stringTypeNode('utf8'), 32);
`,
        ),
    ),
    example(
        'Fixed UTF-8 strings',
        code(
            'typescript',
            `
fixedSizeTypeNode(stringTypeNode('utf8'), 10);

// Hello => 0x48656C6C6F0000000000
`,
        ),
    ),
    example(
        'Fixed byte arrays',
        code(
            'typescript',
            `
fixedSizeTypeNode(bytesTypeNode(), 4);

// [1, 2]          => 0x01020000
// [1, 2, 3, 4, 5] => 0x01020304
`,
        ),
    ),
];
