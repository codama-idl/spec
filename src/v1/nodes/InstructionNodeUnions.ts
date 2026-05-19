/**
 * Inline-helper unions used by instruction-shaped nodes.
 */

import { defineUnion } from '../../api';

export const instructionByteDeltaValueUnion = defineUnion('InstructionByteDeltaValue', {
    docs: ['The value forms accepted by an `instructionByteDeltaNode`.'],
    members: ['accountLinkNode', 'argumentValueNode', 'numberValueNode', 'resolverValueNode'],
});

export const instructionRemainingAccountsValueUnion = defineUnion('InstructionRemainingAccountsValue', {
    docs: ['The value forms accepted by an `instructionRemainingAccountsNode`.'],
    members: ['argumentValueNode', 'resolverValueNode'],
});
