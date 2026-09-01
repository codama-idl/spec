import { attribute, defineNode, node, optionalAttribute, stringIdentifier } from '../../../api';
import { examples } from './InstructionLinkNode.examples';

export const instructionLinkNode = defineNode('instructionLinkNode', {
    docs: ['A reference to an instruction defined elsewhere — possibly in a different program.'],
    attributes: [
        optionalAttribute('program', node('programLinkNode'), {
            docs: [
                'The program the referenced instruction belongs to. When omitted, the surrounding program is assumed.',
            ],
        }),
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the referenced instruction.'],
        }),
    ],
    examples,
});
