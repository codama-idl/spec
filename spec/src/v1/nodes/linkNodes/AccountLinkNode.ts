import { attribute, defineNode, node, optionalAttribute, stringIdentifier } from '../../../api';

export const accountLinkNode = defineNode('accountLinkNode', {
    docs: 'A reference to an account defined elsewhere — possibly in a different program.',
    attributes: [
        optionalAttribute('program', node('programLinkNode'), {
            docs: 'The program the referenced account belongs to. When omitted, the surrounding program is assumed.',
        }),
        attribute('name', stringIdentifier(), {
            docs: 'The name of the referenced account.',
        }),
    ],
});
