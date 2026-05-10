/**
 * Named unions for the contextual-value-node category.
 *
 * `ConditionalValueCondition`, `ResolverDependency`, `PdaSeedValueValue`,
 * `PdaValuePda`, and `PdaValueProgramId` are inline-union helpers used by
 * specific contextual-value-node attributes.
 */

import { defineUnion, union } from '../../../api';

const STANDALONE_CONTEXTUAL_VALUE_NODE_KINDS = [
    'accountBumpValueNode',
    'accountValueNode',
    'argumentValueNode',
    'conditionalValueNode',
    'identityValueNode',
    'payerValueNode',
    'pdaValueNode',
    'programIdValueNode',
    'resolverValueNode',
] as const;

export const standaloneContextualValueNodeUnion = defineUnion('StandaloneContextualValueNode', {
    docs: 'Every contextual-value node usable as a top-level value.',
    members: [...STANDALONE_CONTEXTUAL_VALUE_NODE_KINDS],
});

export const contextualValueNodeUnion = defineUnion('ContextualValueNode', {
    docs: 'The composable form: any standalone contextual-value node.',
    members: [union('StandaloneContextualValueNode')],
});

export const registeredContextualValueNodeUnion = defineUnion('RegisteredContextualValueNode', {
    docs: 'Every node tagged as a contextual-value node, including helper variants.',
    members: [union('StandaloneContextualValueNode'), 'pdaSeedValueNode'],
});

export const instructionInputValueNodeUnion = defineUnion('InstructionInputValueNode', {
    docs: 'Anything that can be used as the input value for an instruction account or argument default — a value, contextual reference, or program link.',
    members: [union('ContextualValueNode'), 'programLinkNode', union('ValueNode')],
});

// Inline unions used by contextual value nodes.

export const conditionalValueConditionUnion = defineUnion('ConditionalValueCondition', {
    docs: 'The condition forms accepted by a `conditionalValueNode`.',
    members: ['accountValueNode', 'argumentValueNode', 'resolverValueNode'],
});

export const resolverDependencyUnion = defineUnion('ResolverDependency', {
    docs: 'The dependency forms accepted by a `resolverValueNode`.',
    members: ['accountValueNode', 'argumentValueNode'],
});

export const pdaSeedValueValueUnion = defineUnion('PdaSeedValueValue', {
    docs: 'The value forms accepted by a `pdaSeedValueNode`.',
    members: ['accountValueNode', 'argumentValueNode', union('ValueNode')],
});

export const pdaValuePdaUnion = defineUnion('PdaValuePda', {
    docs: 'A `pdaValueNode` may reference a PDA either by link or inline.',
    members: ['pdaLinkNode', 'pdaNode'],
});

export const pdaValueProgramIdUnion = defineUnion('PdaValueProgramId', {
    docs: 'The program-id forms accepted by a `pdaValueNode`.',
    members: ['accountValueNode', 'argumentValueNode'],
});
