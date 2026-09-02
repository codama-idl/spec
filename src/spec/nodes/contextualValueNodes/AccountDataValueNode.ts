import { attribute, defineNode, optionalAttribute, stringIdentifier, stringPath } from '../../../api';
import { examples } from './AccountDataValueNode.examples';

export const accountDataValueNode = defineNode('accountDataValueNode', {
    docs: [
        "Refers to a value within a named account's decoded data.",
        "The referenced account must carry an `accountLink` so the account's layout is known.",
        'Resolving the value requires reading the account state at presentation time.',
    ],
    attributes: [
        attribute('account', stringIdentifier(), {
            docs: ['The identifier of the referenced account in the surrounding instruction.'],
        }),
        optionalAttribute('path', stringPath(), {
            docs: [
                "The path to the value within the account's decoded data — e.g. `authority` or `state.balances[0]`.",
                'Field segments are only valid where the data type resolves to a struct (following links).',
                'When absent, the value is the whole decoded account data.',
            ],
        }),
    ],
    examples,
});
