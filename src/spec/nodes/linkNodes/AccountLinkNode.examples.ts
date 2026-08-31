import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an account link node from an account name',
        code(
            'typescript',
            `
const node = accountLinkNode('myAccount');
const nodeFromAnotherProgram = accountLinkNode('myAccount', 'myOtherProgram');
`,
        ),
    ),
];
