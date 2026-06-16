import { displayNodeUnion, registeredDisplayNodeUnion } from './DisplayNode';
import { enumVariantDisplayNode } from './EnumVariantDisplayNode';
import { instructionAccountDisplayNode } from './InstructionAccountDisplayNode';
import { instructionDisplayNode } from './InstructionDisplayNode';
import { structFieldDisplayNode } from './StructFieldDisplayNode';

export const ALL_DISPLAY_NODES = [
    enumVariantDisplayNode,
    instructionAccountDisplayNode,
    instructionDisplayNode,
    structFieldDisplayNode,
] as const;

export const ALL_DISPLAY_NODE_UNIONS = [registeredDisplayNodeUnion, displayNodeUnion] as const;
