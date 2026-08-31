/**
 * Inline-helper unions used by instruction-shaped nodes.
 */

import { defineUnion } from '../../api';

export const instructionByteDeltaValueUnion = defineUnion('instructionByteDeltaValue', {
    docs: [
        'The value forms accepted by an `instructionByteDeltaNode`.',
        'An `accountLinkNode` uses the size of the linked account; an `argumentValueNode` uses the value of the referenced instruction argument; a `numberValueNode` uses that explicit number; and a `resolverValueNode` acts as a fallback for more complex values.',
    ],
    members: ['accountLinkNode', 'argumentValueNode', 'numberValueNode', 'resolverValueNode'],
});

export const instructionRemainingAccountsValueUnion = defineUnion('instructionRemainingAccountsValue', {
    docs: [
        'The value forms accepted by an `instructionRemainingAccountsNode`.',
        'An `argumentValueNode` represents the array of accounts as a new argument of the provided name; a `resolverValueNode` acts as a fallback for more complex scenarios.',
    ],
    members: ['argumentValueNode', 'resolverValueNode'],
});
