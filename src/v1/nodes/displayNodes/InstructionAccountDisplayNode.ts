import { defineNode, enumeration, optionalAttribute, string } from '../../../api';

export const instructionAccountDisplayNode = defineNode('instructionAccountDisplayNode', {
    docs: ['Display metadata for an instruction account: its label in the fallback list and whether it is shown.'],
    attributes: [
        optionalAttribute('label', string(), {
            docs: [
                'An override label shown in the fallback list (e.g. `"To"`).',
                'When absent, renderers derive a label from the account `name`.',
            ],
        }),
        optionalAttribute('skip', enumeration('displaySkip'), {
            docs: ['Whether the account is shown in the fallback list. Defaults to `"never"` (always shown).'],
        }),
    ],
});
