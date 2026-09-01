import { code, example, type DocExamples } from '../../api';

export const examples: DocExamples = [
    example(
        'Create an error node from an input object',
        code(
            'typescript',
            `
const node = errorNode({
    identifier: 'invalidAmountArgument',
    code: 1,
    message: 'The amount argument is invalid.',
});
`,
        ),
    ),
];
