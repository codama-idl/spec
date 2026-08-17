import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        '2-decimals USD amount',
        code(
            'typescript',
            `
amountTypeNode(numberTypeNode('u32'), 2, 'USD');

// 0.01 USD   => 0x01000000
// 10 USD     => 0xE8030000
// 400.60 USD => 0x7C9C0000
`,
        ),
    ),
];
