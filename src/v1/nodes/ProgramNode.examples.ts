import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'Create a program node from an input object',
        code(
            'typescript',
            `
const node = programNode({
    name: 'counter',
    publicKey: '7ovtg4pFqjQdSwFAUCu8gTnh5thZHzAyJFXy3Ssnj3yK',
    version: '1.42.6',
    accounts: [],
    instructions: [],
    definedTypes: [],
    pdas: [],
    events: [],
    errors: [],
});
`,
        ),
    ),
];
