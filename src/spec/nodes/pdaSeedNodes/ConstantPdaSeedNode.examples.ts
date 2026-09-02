import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a constant PDA seed node from a type and a value',
        code(
            'typescript',
            `
const node = constantPdaSeedNode(integerTypeNode('u32'), integerValueNode('42'));
`,
        ),
    ),
    example(
        'A PDA node with a UTF-8 constant seed',
        code(
            'typescript',
            `
pdaNode({
    identifier: 'tickets',
    seeds: [constantPdaSeedNodeFromString('utf8', 'tickets')],
});

// The seed above is equivalent to:
constantPdaSeedNode(stringTypeNode('utf8'), stringValueNode('tickets'));
`,
        ),
    ),
];
