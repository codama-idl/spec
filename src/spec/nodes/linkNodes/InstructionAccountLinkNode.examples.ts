import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an instruction account link node from an account name',
        code(
            'typescript',
            `
// Links to an account in the current instruction.
const node = instructionAccountLinkNode('myAccount');

// Links to an account in another instruction but within the same program.
const nodeFromAnotherInstruction = instructionAccountLinkNode('myAccount', 'myOtherInstruction');

// Links to an account in another instruction from another program.
const nodeFromAnotherProgram = instructionAccountLinkNode(
    'myAccount',
    instructionLinkNode('myOtherInstruction', 'myOtherProgram'),
);
`,
        ),
    ),
];
