import { attribute, defineNode, optionalAttribute, stringIdentifier } from '../../../api';
import { examples } from './AccountFieldValueNode.examples';

export const accountFieldValueNode = defineNode('accountFieldValueNode', {
    docs: [
        "Refers to a field of a named account's decoded data.",
        "The referenced account must carry an `accountLink` so the account's layout is known.",
        'Resolving the value requires reading the account state at presentation time.',
    ],
    attributes: [
        attribute('account', stringIdentifier(), {
            docs: ['The identifier of the referenced account in the surrounding instruction.'],
        }),
        optionalAttribute('path', stringIdentifier(), {
            docs: [
                "The identifier of the field within the account's decoded data.",
                "Only valid when the account's data type resolves to a struct (following links).",
                'When absent, the value is the whole decoded account data.',
            ],
        }),
    ],
    examples,
});
