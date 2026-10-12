import { defineNode, node, optionalAttribute } from '../../../api';
import { transformsAttribute } from '../transformNodes';
import { examples } from './PublicKeyTypeNode.examples';

export const publicKeyTypeNode = defineNode('publicKeyTypeNode', {
    docs: ['A 32-byte Solana public key.'],
    attributes: [
        optionalAttribute('accountLink', node('accountLinkNode'), {
            docs: [
                'A reference to the data layout of the account this address points to.',
                "Path expressions crossing this public key continue into the linked account's decoded data — e.g. `mint.decimals` reads the `decimals` of the mint whose address is in the `mint` field. Resolving such paths requires reading the account state at presentation time; when the account is missing or its data cannot be decoded with the linked layout, the path is unresolved and its consumer falls back as usual.",
                "The link's optional `program` allows cross-program references via the root's `additionalPrograms`.",
            ],
        }),
        transformsAttribute(),
    ],
    examples,
});
