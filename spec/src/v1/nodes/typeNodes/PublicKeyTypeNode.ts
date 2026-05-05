import { defineNode } from '../../../api';

export const publicKeyTypeNode = defineNode('publicKeyTypeNode', {
    docs: 'A 32-byte Solana public key.',
    attributes: [],
});
