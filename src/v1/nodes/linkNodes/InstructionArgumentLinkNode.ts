import { attribute, defineNode, node, optionalAttribute, stringIdentifier } from '../../../api';
import { examples } from './InstructionArgumentLinkNode.examples';

export const instructionArgumentLinkNode = defineNode('instructionArgumentLinkNode', {
    docs: ['A reference to an argument of another instruction.'],
    attributes: [
        optionalAttribute('instruction', node('instructionLinkNode'), {
            docs: [
                'The instruction the referenced argument belongs to. When omitted, the surrounding instruction is assumed.',
                'The instruction link may itself point to a different program if needed.',
            ],
        }),
        attribute('name', stringIdentifier(), {
            docs: ['The name of the referenced instruction argument.'],
        }),
    ],
    examples,
});
