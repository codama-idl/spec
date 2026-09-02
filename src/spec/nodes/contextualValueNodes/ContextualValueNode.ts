/**
 * Named unions for the contextual-value-node category.
 *
 * `conditionalValueCondition`, `pdaSeedValueValue`,
 * `pdaValuePda`, and `pdaValueProgramId` are inline-union helpers used by
 * specific contextual-value-node attributes.
 */

import { defineUnion, union } from '../../../api';

const STANDALONE_CONTEXTUAL_VALUE_NODE_KINDS = [
    'accountBumpValueNode',
    'accountFieldValueNode',
    'accountValueNode',
    'argumentValueNode',
    'conditionalValueNode',
    'identityValueNode',
    'payerValueNode',
    'pdaValueNode',
    'programIdValueNode',
] as const;

export const standaloneContextualValueNodeUnion = defineUnion('standaloneContextualValueNode', {
    docs: ['Every contextual-value node usable as a top-level value.'],
    members: [...STANDALONE_CONTEXTUAL_VALUE_NODE_KINDS],
});

export const contextualValueNodeUnion = defineUnion('contextualValueNode', {
    docs: ['The composable form: any standalone contextual-value node.'],
    members: [union('standaloneContextualValueNode')],
});

export const registeredContextualValueNodeUnion = defineUnion('registeredContextualValueNode', {
    docs: ['Every node tagged as a contextual-value node, including helper variants.'],
    members: [union('standaloneContextualValueNode'), 'pdaSeedValueNode'],
});

export const instructionInputValueNodeUnion = defineUnion('instructionInputValueNode', {
    docs: [
        'Anything that can be used as the input value for an instruction account default or a conditional branch.',
        'Covers concrete values, contextual references, and program links.',
    ],
    members: [union('contextualValueNode'), 'programLinkNode', union('valueNode')],
});

// Inline unions used by contextual value nodes.

export const conditionalValueConditionUnion = defineUnion('conditionalValueCondition', {
    docs: ['The condition forms accepted by a `conditionalValueNode`.'],
    members: ['accountValueNode', 'argumentValueNode'],
});

export const pdaSeedValueValueUnion = defineUnion('pdaSeedValueValue', {
    docs: ['The value forms accepted by a `pdaSeedValueNode`.'],
    members: ['accountValueNode', 'argumentValueNode', union('valueNode')],
});

export const pdaValuePdaUnion = defineUnion('pdaValuePda', {
    docs: ['A `pdaValueNode` may reference a PDA either by link or inline.'],
    members: ['pdaLinkNode', 'pdaNode'],
});

export const pdaValueProgramIdUnion = defineUnion('pdaValueProgramId', {
    docs: ['The program-id forms accepted by a `pdaValueNode`.'],
    members: ['accountValueNode', 'argumentValueNode'],
});
