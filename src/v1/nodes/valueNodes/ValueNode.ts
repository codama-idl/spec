/**
 * Named unions for the value-node category.
 *
 *  - `standaloneValueNode`    every value node usable as a top-level value.
 *  - `valueNode`              the composable form (alias for `standaloneValueNode` in v1).
 *  - `registeredValueNode`    every value-shaped node, including container variants like
 *                             `mapEntryValueNode` and `structFieldValueNode`.
 *  - `enumValuePayload`       the inline `structValueNode | tupleValueNode` union used
 *                             for `enumValueNode.value`.
 */

import { defineUnion, union } from '../../../api';

const STANDALONE_VALUE_NODE_KINDS = [
    'arrayValueNode',
    'booleanValueNode',
    'bytesValueNode',
    'constantValueNode',
    'enumValueNode',
    'mapValueNode',
    'noneValueNode',
    'numberValueNode',
    'publicKeyValueNode',
    'setValueNode',
    'someValueNode',
    'stringValueNode',
    'structValueNode',
    'tupleValueNode',
] as const;

export const standaloneValueNodeUnion = defineUnion('standaloneValueNode', {
    docs: ['Every value node that can be used as a top-level value.'],
    members: [...STANDALONE_VALUE_NODE_KINDS],
});

export const valueNodeUnion = defineUnion('valueNode', {
    docs: ['The composable form: any standalone value node.'],
    members: [union('standaloneValueNode')],
});

export const registeredValueNodeUnion = defineUnion('registeredValueNode', {
    docs: ['Every node tagged as a value-shaped node, including container variants.'],
    members: [union('standaloneValueNode'), 'mapEntryValueNode', 'structFieldValueNode'],
});

export const enumValuePayloadUnion = defineUnion('enumValuePayload', {
    docs: ['The payload kinds an `enumValueNode` may carry — struct fields or positional tuple slots.'],
    members: ['structValueNode', 'tupleValueNode'],
});
