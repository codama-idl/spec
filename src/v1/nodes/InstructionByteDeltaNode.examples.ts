import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'A byte delta that represents a new account',
        code(
            'typescript',
            `
instructionByteDeltaNode(accountLinkNode('token'));
`,
        ),
    ),
    example(
        'A byte delta that represents an account deletion',
        code(
            'typescript',
            `
instructionByteDeltaNode(accountLinkNode('token'), { subtract: true });
`,
        ),
    ),
    example(
        'A byte delta that uses an argument value to increase the space of an account',
        code(
            'typescript',
            `
instructionByteDeltaNode(argumentValueNode('additionalSpace'), { withHeader: false });
`,
        ),
    ),
];
