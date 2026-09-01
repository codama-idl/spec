import { attribute, defineNode, node, optionalAttribute, stringIdentifier } from '../../../api';
import { examples } from './InstructionAccountLinkNode.examples';

export const instructionAccountLinkNode = defineNode('instructionAccountLinkNode', {
    docs: ['A reference to an account of another instruction.'],
    attributes: [
        optionalAttribute('instruction', node('instructionLinkNode'), {
            docs: [
                'The instruction the referenced account belongs to. When omitted, the surrounding instruction is assumed.',
                'The instruction link may itself point to a different program if needed.',
            ],
        }),
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the referenced instruction account.'],
        }),
    ],
    examples,
});
