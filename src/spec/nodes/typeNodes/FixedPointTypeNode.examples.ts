import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A token amount with 6 decimal places',
        code(
            'typescript',
            `
const node = fixedPointTypeNode(integerTypeNode('u64'), 6, { unit: 'USDC' });

// 1500000 => 1.5 USDC
`,
        ),
    ),
    example(
        'A SOL amount expressed in lamports',
        code(
            'typescript',
            `
fixedPointTypeNode(integerTypeNode('u64'), 9, { unit: 'SOL' });

// 1000000000 => 1 SOL
`,
        ),
    ),
    example(
        'A binary Q64.64 fraction',
        code(
            'typescript',
            `
fixedPointTypeNode(integerTypeNode('u128'), 64, { base: 2 });

// raw / 2^64
`,
        ),
    ),
];
