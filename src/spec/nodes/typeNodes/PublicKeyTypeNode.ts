import { defineNode, node, optionalAttribute } from '../../../api';
import { transformsAttribute } from '../transformNodes';
import { examples } from './PublicKeyTypeNode.examples';

export const publicKeyTypeNode = defineNode('publicKeyTypeNode', {
    docs: ['A 32-byte Solana public key.'],
    attributes: [
        optionalAttribute('accountLink', node('accountLinkNode'), {
            docs: [
                'A reference to the data layout of the account this address points to.',
                "Path expressions cross this public key with a `.data` segment, which continues into the linked account's decoded data, as `.data` does after an account identifier in interpolated intents — e.g. `mint.data.decimals` reads the `decimals` of the mint whose address is in the `mint` field, and `mint.data` its whole data. Other segments after the public key are reserved for other attributes of the account, e.g. its lamports, and are invalid until then. Resolving such paths requires reading the account state at presentation time; when the account is missing or its data cannot be decoded with the linked layout, the path is unresolved and its consumer falls back as usual.",
                "The link's optional `program` allows cross-program references via the root's `additionalPrograms`.",
            ],
        }),
        transformsAttribute(),
    ],
    examples,
});
