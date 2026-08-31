import { defineUnion, union } from '../../../api';

export const registeredDiscriminatorNodeUnion = defineUnion('registeredDiscriminatorNode', {
    docs: ['Every node tagged as a discriminator strategy.'],
    members: ['constantDiscriminatorNode', 'fieldDiscriminatorNode', 'sizeDiscriminatorNode'],
});

export const discriminatorNodeUnion = defineUnion('discriminatorNode', {
    docs: ['The composable form: any registered discriminator node.'],
    members: [union('registeredDiscriminatorNode')],
});
