import { accountLinkNode } from './AccountLinkNode';
import { definedTypeLinkNode } from './DefinedTypeLinkNode';
import { instructionAccountLinkNode } from './InstructionAccountLinkNode';
import { instructionLinkNode } from './InstructionLinkNode';
import { linkNodeUnion, registeredLinkNodeUnion } from './LinkNode';
import { pdaLinkNode } from './PdaLinkNode';
import { programLinkNode } from './ProgramLinkNode';

export const ALL_LINK_NODES = [
    accountLinkNode,
    definedTypeLinkNode,
    instructionAccountLinkNode,
    instructionLinkNode,
    pdaLinkNode,
    programLinkNode,
] as const;

export const ALL_LINK_NODE_UNIONS = [registeredLinkNodeUnion, linkNodeUnion] as const;
