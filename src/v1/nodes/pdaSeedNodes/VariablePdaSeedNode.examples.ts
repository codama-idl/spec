import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a variable PDA seed node from a name and a type node',
        code(
            'typescript',
            `
const node = variablePdaSeedNode('amount', numberTypeNode('u32'));
`,
        ),
    ),
    example(
        'A PDA node with a public key variable seed',
        code(
            'typescript',
            `
pdaNode({
    name: 'ticket',
    seeds: [variablePdaSeedNode('authority', publicKeyTypeNode())],
});
`,
        ),
    ),
];
