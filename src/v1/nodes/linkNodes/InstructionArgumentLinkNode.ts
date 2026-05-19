import { attribute, defineNode, node, optionalAttribute, stringIdentifier } from '../../../api';

export const instructionArgumentLinkNode = defineNode('instructionArgumentLinkNode', {
    docs: ['A reference to an argument of another instruction.'],
    attributes: [
        optionalAttribute('instruction', node('instructionLinkNode'), {
            docs: [
                'The instruction the referenced argument belongs to. When omitted, the surrounding instruction is assumed.',
            ],
        }),
        attribute('name', stringIdentifier(), {
            docs: ['The name of the referenced instruction argument.'],
        }),
    ],
});
