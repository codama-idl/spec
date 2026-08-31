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
import { examples } from './InstructionNode.examples';

export const instructionNode = defineNode('instructionNode', {
    docs: [
        'A program instruction: its accounts, arguments, byte-delta hints, discriminators, optional status, and optional sub-instructions.',
        '',
        '![Diagram](https://github.com/codama-idl/codama/assets/3642397/0d8edced-cfa4-4500-b80c-ebc56181a338)',
    ],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the instruction.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the instruction.'],
        }),
        optionalAttribute('optionalAccountStrategy', enumeration('optionalAccountStrategy'), {
            docs: [
                'How absent optional accounts are represented when serialising the instruction.',
                'When absent, `programId` is assumed.',
            ],
        }),
        attribute('accounts', array(node('instructionAccountNode')), {
            docs: ['The accounts the instruction operates on, in order.'],
        }),
        attribute('arguments', array(node('instructionArgumentNode')), {
            docs: ['The serialised arguments of the instruction, in order.'],
        }),
        optionalAttribute('extraArguments', array(node('instructionArgumentNode')), {
            docs: [
                'Additional arguments exposed in the generated client API but not serialised on the wire.',
                'Typically useful for feeding the default values of other arguments or accounts.',
            ],
        }),
        optionalAttribute('remainingAccounts', array(node('instructionRemainingAccountsNode')), {
            docs: ['Variable-length tails of accounts appended after the named account slots.'],
        }),
        optionalAttribute('byteDeltas', array(node('instructionByteDeltaNode')), {
            docs: [
                'Byte-size adjustments applied when computing rent or buffer size — for instructions that resize accounts.',
                'All deltas are added together, unless their `subtract` attribute is set.',
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
            docs: [
                'Nested instructions that split this instruction into distinct scenarios — e.g. one sub-instruction per version of the instruction.',
            ],
        }),
        optionalAttribute('provides', array(node('providedNode')), {
            docs: [
                'Named nodes exposed to consumers in the surrounding scope.',
                'Each entry pairs with an `injectedValueNode` that references it by key, so reusable types can pull contextual values without naming siblings directly.',
            ],
        }),
        optionalAttribute('display', node('instructionDisplayNode'), {
            docs: ['Display metadata describing how the instruction is presented.'],
        }),
    ],
    examples,
});
