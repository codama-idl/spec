import { address, attribute, defineNode, optionalAttribute, stringIdentifier } from '../../../api';

export const publicKeyValueNode = defineNode('publicKeyValueNode', {
    docs: ['A concrete public key, with an optional symbolic identifier for the address.'],
    attributes: [
        attribute('publicKey', address(), {
            docs: ['The base58-encoded public key.'],
        }),
        optionalAttribute('identifier', stringIdentifier(), {
            docs: ['A symbolic name for the address, useful in generated client code.'],
        }),
    ],
});
