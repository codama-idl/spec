import { amountNumberDisplayNode } from './AmountNumberDisplayNode';
import { dateTimeNumberDisplayNode } from './DateTimeNumberDisplayNode';
import { displayNodeUnion, numberDisplayNodeUnion, registeredDisplayNodeUnion } from './DisplayNode';
import { durationNumberDisplayNode } from './DurationNumberDisplayNode';
import { enumVariantDisplayNode } from './EnumVariantDisplayNode';
import { instructionAccountDisplayNode } from './InstructionAccountDisplayNode';
import { instructionDisplayNode } from './InstructionDisplayNode';
import { stringDisplayNode } from './StringDisplayNode';
import { structFieldDisplayNode } from './StructFieldDisplayNode';

export const ALL_DISPLAY_NODES = [
    amountNumberDisplayNode,
    dateTimeNumberDisplayNode,
    durationNumberDisplayNode,
    enumVariantDisplayNode,
    instructionAccountDisplayNode,
    instructionDisplayNode,
    stringDisplayNode,
    structFieldDisplayNode,
] as const;

export const ALL_DISPLAY_NODE_UNIONS = [numberDisplayNodeUnion, registeredDisplayNodeUnion, displayNodeUnion] as const;
