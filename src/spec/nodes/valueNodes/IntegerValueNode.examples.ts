import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an integer value node from a string',
        code(
            'typescript',
            `
const node = integerValueNode('42');
`,
        ),
    ),
    example(
        'A u64 discriminator beyond the safe JavaScript number range',
        code(
            'typescript',
            `
integerValueNode('12048014319693667524');

// The quotes are load-bearing: as a JSON number, this value would be
// corrupted to 12048014319693668352 by standard f64 parsing.
`,
        ),
    ),
];
