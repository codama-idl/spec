import { defineNode } from '../../../api';
import { examples } from './PublicKeyTypeNode.examples';

export const publicKeyTypeNode = defineNode('publicKeyTypeNode', {
    docs: ['A 32-byte Solana public key.'],
    attributes: [],
    examples,
});
