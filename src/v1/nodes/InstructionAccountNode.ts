import {
    attribute,
    boolean,
    defineNode,
    docs,
    literalUnion,
    optionalAttribute,
    stringIdentifier,
    union,
} from '../../api';

export const instructionAccountNode = defineNode('instructionAccountNode', {
    docs: [
        'An account participating in an instruction, with its name, signing/writability flags, and an optional default value.',
    ],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the account.'],
        }),
        attribute('isWritable', boolean(), {
            docs: ['Whether the instruction may write to the account.'],
        }),
        attribute('isSigner', literalUnion(true, false, 'either'), {
            docs: [
                'Whether the account must sign the transaction.',
                'The literal `"either"` indicates a slot that may or may not sign depending on context.',
            ],
        }),
        optionalAttribute('isOptional', boolean(), {
            docs: ['Whether the account slot may be omitted by callers.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the account slot.'],
        }),
        optionalAttribute('defaultValue', union('instructionInputValueNode'), {
            docs: ['A default value used to fill the slot when the caller does not provide one.'],
        }),
    ],
});
