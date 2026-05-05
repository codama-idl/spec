import { attribute, boolean, defineNode, docs, literalUnion, optionalAttribute, union } from '../../api';

export const instructionRemainingAccountsNode = defineNode('instructionRemainingAccountsNode', {
    docs: 'A "remaining accounts" slot in an instruction — a variable-length tail of accounts derived from a value.',
    attributes: [
        optionalAttribute('isOptional', boolean(), {
            docs: 'Whether the remaining-accounts tail may be empty.',
        }),
        optionalAttribute('isSigner', literalUnion(true, false, 'either'), {
            docs: 'Whether each remaining account must sign the transaction. The literal `"either"` indicates a slot that may or may not sign depending on context.',
        }),
        optionalAttribute('isWritable', boolean(), {
            docs: 'Whether the instruction may write to each remaining account.',
        }),
        optionalAttribute('docs', docs(), {
            docs: 'Markdown documentation for the remaining-accounts slot.',
        }),
        attribute('value', union('InstructionRemainingAccountsValue'), {
            docs: 'The source of the remaining-accounts list — a referenced argument or a resolver.',
        }),
    ],
});
