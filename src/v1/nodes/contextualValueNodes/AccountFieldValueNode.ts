import { attribute, defineNode, optionalAttribute, stringIdentifier } from '../../../api';

export const accountFieldValueNode = defineNode('accountFieldValueNode', {
    docs: [
        "Refers to a field of a named account's decoded data.",
        "The referenced account must carry an `accountLink` so the account's layout is known.",
        'Resolving the value requires reading the account state at presentation time.',
    ],
    attributes: [
        attribute('account', stringIdentifier(), {
            docs: ['The name of the referenced account in the surrounding instruction.'],
        }),
        optionalAttribute('path', stringIdentifier(), {
            docs: [
                "The name of the field within the account's decoded data.",
                'When absent, the value is the whole decoded account data.',
            ],
        }),
    ],
});
