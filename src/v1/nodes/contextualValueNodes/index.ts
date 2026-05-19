import { accountBumpValueNode } from './AccountBumpValueNode';
import { accountValueNode } from './AccountValueNode';
import { argumentValueNode } from './ArgumentValueNode';
import { conditionalValueNode } from './ConditionalValueNode';
import {
    conditionalValueConditionUnion,
    contextualValueNodeUnion,
    instructionInputValueNodeUnion,
    pdaSeedValueValueUnion,
    pdaValuePdaUnion,
    pdaValueProgramIdUnion,
    registeredContextualValueNodeUnion,
    resolverDependencyUnion,
    standaloneContextualValueNodeUnion,
} from './ContextualValueNode';
import { identityValueNode } from './IdentityValueNode';
import { payerValueNode } from './PayerValueNode';
import { pdaSeedValueNode } from './PdaSeedValueNode';
import { pdaValueNode } from './PdaValueNode';
import { programIdValueNode } from './ProgramIdValueNode';
import { resolverValueNode } from './ResolverValueNode';

export const ALL_CONTEXTUAL_VALUE_NODES = [
    accountBumpValueNode,
    accountValueNode,
    argumentValueNode,
    conditionalValueNode,
    identityValueNode,
    payerValueNode,
    pdaSeedValueNode,
    pdaValueNode,
    programIdValueNode,
    resolverValueNode,
] as const;

export const ALL_CONTEXTUAL_VALUE_NODE_UNIONS = [
    standaloneContextualValueNodeUnion,
    contextualValueNodeUnion,
    registeredContextualValueNodeUnion,
    instructionInputValueNodeUnion,
    conditionalValueConditionUnion,
    resolverDependencyUnion,
    pdaSeedValueValueUnion,
    pdaValuePdaUnion,
    pdaValueProgramIdUnion,
] as const;
