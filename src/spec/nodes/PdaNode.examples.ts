import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'A PDA with constant and variable seeds',
        code(
            'typescript',
            `
pdaNode({
    name: 'ticket',
    seeds: [
        constantPdaSeedNodeFromString('utf8', 'raffles'),
        variablePdaSeedNode('raffle', publicKeyTypeNode()),
        constantPdaSeedNodeFromString('utf8', 'tickets'),
        variablePdaSeedNode('ticketNumber', numberTypeNode('u32')),
    ],
});
`,
        ),
    ),
    example(
        'A PDA with no seeds',
        code(
            'typescript',
            `
pdaNode({
    name: 'seedlessPda',
    seeds: [],
});
`,
        ),
    ),
];
