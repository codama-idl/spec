import { accountBumpValueNode } from './AccountBumpValueNode';
import { accountFieldValueNode } from './AccountFieldValueNode';
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
    standaloneContextualValueNodeUnion,
} from './ContextualValueNode';
import { identityValueNode } from './IdentityValueNode';
import { payerValueNode } from './PayerValueNode';
import { pdaSeedValueNode } from './PdaSeedValueNode';
import { pdaValueNode } from './PdaValueNode';
import { programIdValueNode } from './ProgramIdValueNode';

export const ALL_CONTEXTUAL_VALUE_NODES = [
    accountBumpValueNode,
    accountFieldValueNode,
    accountValueNode,
    argumentValueNode,
    conditionalValueNode,
    identityValueNode,
    payerValueNode,
    pdaSeedValueNode,
    pdaValueNode,
    programIdValueNode,
] as const;

export const ALL_CONTEXTUAL_VALUE_NODE_UNIONS = [
    standaloneContextualValueNodeUnion,
    contextualValueNodeUnion,
    registeredContextualValueNodeUnion,
    instructionInputValueNodeUnion,
    conditionalValueConditionUnion,
    pdaSeedValueValueUnion,
    pdaValuePdaUnion,
    pdaValueProgramIdUnion,
] as const;
