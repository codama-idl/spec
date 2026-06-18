import { defineNode, optionalAttribute, string } from '../../../api';

export const instructionDisplayNode = defineNode('instructionDisplayNode', {
    docs: [
        'Display metadata for an instruction: a short intent label and an interpolated sentence template.',
        'Either form may be absent; presentation strategy is left to the renderer.',
    ],
    attributes: [
        optionalAttribute('intent', string(), {
            docs: ['A short imperative label describing what the instruction does (e.g. `"Transfer"`).'],
        }),
        optionalAttribute('interpolatedIntent', string(), {
            docs: [
                'A sentence template that composes the instruction into prose with `${root.path}` placeholders.',
                'Roots are `data.` (an instruction argument) and `accounts.` (an instruction account); the path is flat after the root (e.g. `${data.amount}`, `${accounts.destination}`).',
                "A placeholder renders through its referent's own presentation; the `skip` rule governs the fallback list only and never the sentence.",
            ],
        }),
    ],
});
