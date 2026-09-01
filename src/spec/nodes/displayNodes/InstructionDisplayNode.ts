import { defineNode, optionalAttribute, string } from '../../../api';
import { examples } from './InstructionDisplayNode.examples';

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
                'A sentence template that composes the instruction into prose with `${root…}` placeholders.',
                'Roots are `data` (the instruction data) and `accounts` (the instruction accounts). After the `data` root, placeholders embed the shared path-expression grammar (e.g. `${data.amount}`, `${data.config.fees[0]}`, `${data[0]}`); after the `accounts` root, exactly one account identifier follows (e.g. `${accounts.destination}`) — accounts resolve to addresses, so nothing nests.',
                "A placeholder renders through its referent's own presentation; the `skip` rule governs the fallback list only and never the sentence.",
            ],
        }),
    ],
    examples,
});
