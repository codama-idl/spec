import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create an empty enum variant type node from a name',
        code(
            'typescript',
            `
const node = enumEmptyVariantTypeNode('myVariantName');
`,
        ),
    ),
];
