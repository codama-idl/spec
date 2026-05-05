import { attribute, defineNode, node, optionalAttribute, stringIdentifier } from '../../../api';

export const instructionAccountLinkNode = defineNode('instructionAccountLinkNode', {
    docs: 'A reference to an account of another instruction.',
    attributes: [
        optionalAttribute('instruction', node('instructionLinkNode'), {
            docs: 'The instruction the referenced account belongs to. When omitted, the surrounding instruction is assumed.',
        }),
        attribute('name', stringIdentifier(), {
            docs: 'The name of the referenced instruction account.',
        }),
    ],
});
