import { attribute, defineNode, node, optionalAttribute, stringIdentifier } from '../../../api';

export const instructionLinkNode = defineNode('instructionLinkNode', {
    docs: ['A reference to an instruction defined elsewhere — possibly in a different program.'],
    attributes: [
        optionalAttribute('program', node('programLinkNode'), {
            docs: [
                'The program the referenced instruction belongs to. When omitted, the surrounding program is assumed.',
            ],
        }),
        attribute('name', stringIdentifier(), {
            docs: ['The name of the referenced instruction.'],
        }),
    ],
});
