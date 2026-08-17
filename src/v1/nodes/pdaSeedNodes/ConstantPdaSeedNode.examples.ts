import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'A PDA node with a UTF-8 constant seed',
        code(
            'typescript',
            `
pdaNode({
    name: 'tickets',
    seeds: [constantPdaSeedNodeFromString('utf8', 'tickets')],
});
`,
        ),
    ),
];
