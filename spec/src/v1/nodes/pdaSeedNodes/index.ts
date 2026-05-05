import { constantPdaSeedNode } from './ConstantPdaSeedNode';
import { constantPdaSeedValueUnion, pdaSeedNodeUnion, registeredPdaSeedNodeUnion } from './PdaSeedNode';
import { variablePdaSeedNode } from './VariablePdaSeedNode';

export const ALL_PDA_SEED_NODES = [constantPdaSeedNode, variablePdaSeedNode] as const;

export const ALL_PDA_SEED_NODE_UNIONS = [
    registeredPdaSeedNodeUnion,
    pdaSeedNodeUnion,
    constantPdaSeedValueUnion,
] as const;
