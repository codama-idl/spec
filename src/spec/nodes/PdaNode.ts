import { address, array, attribute, defineNode, docs, optionalAttribute, stringIdentifier, union } from '../../api';
import { examples } from './PdaNode.examples';

export const pdaNode = defineNode('pdaNode', {
    docs: [
        'A program-derived address: its name, optional program ID override, and the seeds used to derive it.',
        '',
        '![Diagram](https://github.com/codama-idl/codama/assets/3642397/4f7c9718-1ffa-4f2c-aa45-71b3ce204219)',
    ],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the PDA.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the PDA.'],
        }),
        optionalAttribute('programId', address(), {
            docs: [
                'The base58-encoded program ID used to derive the PDA. When omitted, the surrounding program is assumed.',
            ],
        }),
        attribute('seeds', array(union('pdaSeedNode')), {
            docs: ['The seeds used to derive the PDA, in order.'],
        }),
    ],
    examples,
});
