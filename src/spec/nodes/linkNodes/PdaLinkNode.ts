import { attribute, defineNode, node, optionalAttribute, stringIdentifier } from '../../../api';
import { examples } from './PdaLinkNode.examples';

export const pdaLinkNode = defineNode('pdaLinkNode', {
    docs: ['A reference to a PDA defined elsewhere — possibly in a different program.'],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the referenced PDA.'],
        }),
        optionalAttribute('program', node('programLinkNode'), {
            docs: ['The program the referenced PDA belongs to. When omitted, the surrounding program is assumed.'],
        }),
    ],
    examples,
});
