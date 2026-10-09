import { amountNumberDisplayNode } from './AmountNumberDisplayNode';
import { displayNodeUnion, numberDisplayNodeUnion, registeredDisplayNodeUnion } from './DisplayNode';
import { enumVariantDisplayNode } from './EnumVariantDisplayNode';
import { instructionAccountDisplayNode } from './InstructionAccountDisplayNode';
import { instructionDisplayNode } from './InstructionDisplayNode';
import { stringDisplayNode } from './StringDisplayNode';
import { structFieldDisplayNode } from './StructFieldDisplayNode';
import { unitNumberDisplayNode } from './UnitNumberDisplayNode';
import { valueLabelDisplayNode } from './ValueLabelDisplayNode';

export const ALL_DISPLAY_NODES = [
    amountNumberDisplayNode,
    enumVariantDisplayNode,
    instructionAccountDisplayNode,
    instructionDisplayNode,
    stringDisplayNode,
    structFieldDisplayNode,
    unitNumberDisplayNode,
    valueLabelDisplayNode,
] as const;

export const ALL_DISPLAY_NODE_UNIONS = [numberDisplayNodeUnion, registeredDisplayNodeUnion, displayNodeUnion] as const;
