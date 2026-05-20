import {
    array,
    attribute,
    defineNode,
    docs,
    enumeration,
    node,
    optionalAttribute,
    stringIdentifier,
    union,
} from '../../api';

export const instructionNode = defineNode('instructionNode', {
    docs: [
        'A program instruction: its accounts, arguments, byte-delta hints, discriminators, optional status, and optional sub-instructions.',
    ],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the instruction.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the instruction.'],
        }),
        optionalAttribute('optionalAccountStrategy', enumeration('optionalAccountStrategy'), {
            docs: ['How absent optional accounts are represented when serialising the instruction.'],
        }),
        optionalAttribute('accounts', array(node('instructionAccountNode')), {
            docs: ['The accounts the instruction operates on, in order.'],
        }),
        optionalAttribute('arguments', array(node('instructionArgumentNode')), {
            docs: ['The serialised arguments of the instruction, in order.'],
        }),
        optionalAttribute('extraArguments', array(node('instructionArgumentNode')), {
            docs: ['Additional arguments exposed in the generated client API but not serialised on the wire.'],
        }),
        optionalAttribute('remainingAccounts', array(node('instructionRemainingAccountsNode')), {
            docs: ['Variable-length tails of accounts appended after the named account slots.'],
        }),
        optionalAttribute('byteDeltas', array(node('instructionByteDeltaNode')), {
            docs: [
                'Byte-size adjustments applied when computing rent or buffer size — for instructions that resize accounts.',
            ],
        }),
        optionalAttribute('discriminators', array(union('discriminatorNode')), {
            docs: [
                'Discriminators that distinguish this instruction from others.',
                'When multiple are listed, they are combined with a logical AND.',
            ],
        }),
        optionalAttribute('status', node('instructionStatusNode'), {
            docs: ['The lifecycle status of the instruction.'],
        }),
        optionalAttribute('subInstructions', array(node('instructionNode')), {
            docs: ['Inner instructions invoked through CPI as part of executing this instruction.'],
        }),
    ],
});
