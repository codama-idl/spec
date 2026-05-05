import { array, attribute, defineNode, docs, optionalAttribute, string, stringIdentifier, union } from '../../api';

export const pdaNode = defineNode('pdaNode', {
    docs: 'A program-derived address: its name, optional program ID override, and the seeds used to derive it.',
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: 'The name of the PDA.',
        }),
        optionalAttribute('docs', docs(), {
            docs: 'Markdown documentation for the PDA.',
        }),
        optionalAttribute('programId', string(), {
            docs: 'The base58-encoded program ID used to derive the PDA. When omitted, the surrounding program is assumed.',
        }),
        attribute('seeds', array(union('PdaSeedNode')), {
            docs: 'The seeds used to derive the PDA, in order.',
        }),
    ],
});
