import { attribute, defineNode, enumeration, optionalAttribute, string } from '../../api';

export const instructionStatusNode = defineNode('instructionStatusNode', {
    docs: [
        'The lifecycle stage of an instruction (draft, live, deprecated, archived) with an optional accompanying message.',
    ],
    attributes: [
        attribute('lifecycle', enumeration('InstructionLifecycle'), {
            docs: ['The lifecycle stage.'],
        }),
        optionalAttribute('message', string(), {
            docs: ['Free-form prose accompanying the status — e.g. a deprecation notice with migration guidance.'],
        }),
    ],
});
