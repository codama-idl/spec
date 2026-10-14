import { attribute, defineNode, optionalAttribute, stringIdentifier, stringPath } from '../../../api';
import { examples } from './AccountDataValueNode.examples';

export const accountDataValueNode = defineNode('accountDataValueNode', {
    docs: [
        "Refers to a value within a named account's decoded data.",
        "The referenced account must carry an `accountLink` so the account's layout is known.",
        'Resolving the value requires reading the account state. When presenting, an unresolvable value falls back as usual. When building an instruction, e.g. for a PDA seed or a default value, there is nothing to fall back to: consumers that cannot or do not read the account must fail explicitly rather than guess.',
    ],
    attributes: [
        attribute('account', stringIdentifier(), {
            docs: ['The identifier of the referenced account in the surrounding instruction.'],
        }),
        optionalAttribute('path', stringPath(), {
            docs: [
                "The path to the value within the account's decoded data — e.g. `authority` or `state.balances[0]`.",
                "Field segments are only valid where the data type resolves to a struct (following type links), and a `.data` segment crosses a public key's `accountLink` into the linked account's data, e.g. `mint.data.decimals`.",
                'When absent, the value is the whole decoded account data.',
            ],
        }),
    ],
    examples,
});
