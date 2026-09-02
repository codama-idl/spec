import {
    attribute,
    boolean,
    defineNode,
    docs,
    literalUnion,
    node,
    optionalAttribute,
    stringIdentifier,
} from '../../api';
import { examples } from './InstructionRemainingAccountsNode.examples';

export const instructionRemainingAccountsNode = defineNode('instructionRemainingAccountsNode', {
    docs: [
        'A "remaining accounts" slot in an instruction — a variable-length tail of accounts appended after the named account slots.',
        'Like `instructionAccountNode`, it declares a client input: the identifier names the account-list input exposed to callers. Renderers with matching plugins may fill it automatically.',
    ],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the account-list input exposed to callers.'],
        }),
        optionalAttribute('isOptional', boolean(), {
            docs: ['Whether the remaining-accounts tail may be empty. Defaults to `false`.'],
        }),
        optionalAttribute('isSigner', literalUnion(true, false, 'either'), {
            docs: [
                'Whether each remaining account must sign the transaction.',
                'The literal `"either"` indicates that each account may or may not be a signer, independently of the others. Defaults to `false`.',
            ],
        }),
        optionalAttribute('isWritable', boolean(), {
            docs: ['Whether the instruction may write to each remaining account.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the remaining-accounts slot.'],
        }),
        optionalAttribute('display', node('instructionAccountDisplayNode'), {
            docs: ['Display metadata describing how the remaining-accounts group is presented as a whole.'],
        }),
    ],
    examples,
});
