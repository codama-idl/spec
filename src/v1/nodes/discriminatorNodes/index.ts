import { constantDiscriminatorNode } from './ConstantDiscriminatorNode';
import { discriminatorNodeUnion, registeredDiscriminatorNodeUnion } from './DiscriminatorNode';
import { fieldDiscriminatorNode } from './FieldDiscriminatorNode';
import { sizeDiscriminatorNode } from './SizeDiscriminatorNode';

export const ALL_DISCRIMINATOR_NODES = [
    constantDiscriminatorNode,
    fieldDiscriminatorNode,
    sizeDiscriminatorNode,
] as const;

export const ALL_DISCRIMINATOR_NODE_UNIONS = [registeredDiscriminatorNodeUnion, discriminatorNodeUnion] as const;
