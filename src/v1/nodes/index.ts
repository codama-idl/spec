import { accountNode } from './AccountNode';
import { constantNode } from './ConstantNode';
import { ALL_CONTEXTUAL_VALUE_NODE_UNIONS, ALL_CONTEXTUAL_VALUE_NODES } from './contextualValueNodes';
import { ALL_COUNT_NODE_UNIONS, ALL_COUNT_NODES } from './countNodes';
import { definedTypeNode } from './DefinedTypeNode';
import { ALL_DISCRIMINATOR_NODE_UNIONS, ALL_DISCRIMINATOR_NODES } from './discriminatorNodes';
import { errorNode } from './ErrorNode';
import { eventNode } from './EventNode';
import { instructionAccountNode } from './InstructionAccountNode';
import { instructionArgumentNode } from './InstructionArgumentNode';
import { instructionByteDeltaNode } from './InstructionByteDeltaNode';
import { instructionNode } from './InstructionNode';
import { instructionByteDeltaValueUnion, instructionRemainingAccountsValueUnion } from './InstructionNodeUnions';
import { instructionRemainingAccountsNode } from './InstructionRemainingAccountsNode';
import { instructionStatusNode } from './InstructionStatusNode';
import { ALL_LINK_NODE_UNIONS, ALL_LINK_NODES } from './linkNodes';
import { pdaNode } from './PdaNode';
import { ALL_PDA_SEED_NODE_UNIONS, ALL_PDA_SEED_NODES } from './pdaSeedNodes';
import { programNode } from './ProgramNode';
import { rootNode } from './RootNode';
import { ALL_TYPE_NODE_UNIONS, ALL_TYPE_NODES } from './typeNodes';
import { ALL_VALUE_NODE_UNIONS, ALL_VALUE_NODES } from './valueNodes';

export const ALL_NODES = [
    ...ALL_TYPE_NODES,
    ...ALL_VALUE_NODES,
    ...ALL_LINK_NODES,
    ...ALL_PDA_SEED_NODES,
    ...ALL_COUNT_NODES,
    ...ALL_DISCRIMINATOR_NODES,
    ...ALL_CONTEXTUAL_VALUE_NODES,

    // Top-level nodes — directly under `nodes/`, no subdirectory.
    accountNode,
    constantNode,
    definedTypeNode,
    errorNode,
    eventNode,
    instructionAccountNode,
    instructionArgumentNode,
    instructionByteDeltaNode,
    instructionNode,
    instructionRemainingAccountsNode,
    instructionStatusNode,
    pdaNode,
    programNode,
    rootNode,
] as const;

export const ALL_UNIONS = [
    ...ALL_TYPE_NODE_UNIONS,
    ...ALL_VALUE_NODE_UNIONS,
    ...ALL_LINK_NODE_UNIONS,
    ...ALL_PDA_SEED_NODE_UNIONS,
    ...ALL_COUNT_NODE_UNIONS,
    ...ALL_DISCRIMINATOR_NODE_UNIONS,
    ...ALL_CONTEXTUAL_VALUE_NODE_UNIONS,

    // Inline-helper unions used by instruction-shaped nodes.
    instructionByteDeltaValueUnion,
    instructionRemainingAccountsValueUnion,
] as const;
