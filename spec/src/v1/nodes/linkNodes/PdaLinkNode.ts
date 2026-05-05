import { attribute, defineNode, node, optionalAttribute, stringIdentifier } from '../../../api';

export const pdaLinkNode = defineNode('pdaLinkNode', {
    docs: 'A reference to a PDA defined elsewhere — possibly in a different program.',
    attributes: [
        optionalAttribute('program', node('programLinkNode'), {
            docs: 'The program the referenced PDA belongs to. When omitted, the surrounding program is assumed.',
        }),
        attribute('name', stringIdentifier(), {
            docs: 'The name of the referenced PDA.',
        }),
    ],
});
