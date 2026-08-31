import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A Unix timestamp already in seconds',
        code(
            'typescript',
            `
numberTypeNode('i64', 'le', { display: dateTimeNumberDisplayNode({}) });

// 1_761_365_183 => "2025-10-25T04:06:23.000Z"
`,
        ),
    ),
    example(
        'A millisecond timestamp scaled back to seconds',
        code(
            'typescript',
            `
numberTypeNode('i64', 'le', { display: dateTimeNumberDisplayNode({ ticksPerSecond: 1000 }) });

// 1_761_365_183_000 => "2025-10-25T04:06:23.000Z"
`,
        ),
    ),
];
