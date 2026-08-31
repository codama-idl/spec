import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A required injected value',
        code(
            'typescript',
            `
injectedValueNode({ key: 'decimals' });
`,
        ),
    ),
    example(
        'An injected value with a fallback',
        code(
            'typescript',
            `
injectedValueNode({ key: 'decimals', fallback: numberValueNode(0) });
`,
        ),
    ),
];
