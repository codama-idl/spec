/**
 * Inline-helper unions used by instruction-shaped nodes.
 */

import { defineUnion } from '../../api';

export const instructionByteDeltaValueUnion = defineUnion('instructionByteDeltaValue', {
    docs: [
        'The value forms accepted by an `instructionByteDeltaNode`.',
        'An `accountLinkNode` uses the size of the linked account; a `dataValueNode` uses a value within the instruction data; and a `numberValueNode` uses that explicit number.',
    ],
    members: ['accountLinkNode', 'dataValueNode', 'numberValueNode'],
});
