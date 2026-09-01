import {
    attribute,
    boolean,
    defineNode,
    docs,
    literalUnion,
    node,
    optionalAttribute,
    stringIdentifier,
    union,
} from '../../api';
import { examples } from './InstructionAccountNode.examples';

export const instructionAccountNode = defineNode('instructionAccountNode', {
    docs: [
        'An account participating in an instruction, with its name, signing/writability flags, and an optional default value.',
        '',
        '![Diagram](https://github.com/codama-idl/codama/assets/3642397/4656a08b-2f89-49c2-b428-5378cb1a0b9e)',
    ],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the account.'],
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
            docs: [
                'Whether the account slot may be omitted by callers.',
                'When `true`, absent accounts are handled according to the `optionalAccountStrategy` attribute of the surrounding `instructionNode`. Defaults to `false`.',
            ],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the account slot.'],
        }),
        optionalAttribute('defaultValue', union('instructionInputValueNode'), {
            docs: ['A default value used to fill the slot when the caller does not provide one.'],
        }),
        optionalAttribute('accountLink', node('accountLinkNode'), {
            docs: [
                "A reference to the account's data layout. Required for consumers (e.g. `accountFieldValueNode`) to read fields from the account.",
                "The link's optional `program` allows cross-program references via the root's `additionalPrograms`.",
            ],
        }),
        optionalAttribute('display', node('instructionAccountDisplayNode'), {
            docs: ['Display metadata describing how the account is presented.'],
        }),
    ],
    examples,
});
