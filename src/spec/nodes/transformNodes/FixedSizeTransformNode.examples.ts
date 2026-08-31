import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Fixed UTF-8 strings',
        code(
            'typescript',
            `
stringTypeNode('utf8', { transforms: [fixedSizeTransformNode(10)] });

// Hello => 0x48656C6C6F0000000000
`,
        ),
    ),
    example(
        'Fixed byte arrays',
        code(
            'typescript',
            `
bytesTypeNode({ transforms: [fixedSizeTransformNode(4)] });

// [1, 2]          => 0x01020000
// [1, 2, 3, 4, 5] => 0x01020304
`,
        ),
    ),
];
