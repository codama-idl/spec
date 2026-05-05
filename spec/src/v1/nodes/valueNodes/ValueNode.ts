/**
 * Named unions for the value-node category.
 *
 *  - `StandaloneValueNode`    every value node usable as a top-level value.
 *  - `ValueNode`              the composable form (alias for `StandaloneValueNode` in v1).
 *  - `RegisteredValueNode`    every value-shaped node, including container variants like
 *                             `mapEntryValueNode` and `structFieldValueNode`.
 *  - `EnumValuePayload`       the inline `StructValueNode | TupleValueNode` union used
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

export const standaloneValueNodeUnion = defineUnion('StandaloneValueNode', {
    docs: 'Every value node that can be used as a top-level value.',
    members: [...STANDALONE_VALUE_NODE_KINDS],
});

export const valueNodeUnion = defineUnion('ValueNode', {
    docs: 'The composable form: any standalone value node.',
    members: [union('StandaloneValueNode')],
});

export const registeredValueNodeUnion = defineUnion('RegisteredValueNode', {
    docs: 'Every node tagged as a value-shaped node, including container variants.',
    members: [union('StandaloneValueNode'), 'mapEntryValueNode', 'structFieldValueNode'],
});

export const enumValuePayloadUnion = defineUnion('EnumValuePayload', {
    docs: 'The payload kinds an `enumValueNode` may carry — struct fields or positional tuple slots.',
    members: ['structValueNode', 'tupleValueNode'],
});
