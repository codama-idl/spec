import { defineUnion, union } from '../../../api';

export const registeredDiscriminatorNodeUnion = defineUnion('RegisteredDiscriminatorNode', {
    docs: 'Every node tagged as a discriminator strategy.',
    members: ['constantDiscriminatorNode', 'fieldDiscriminatorNode', 'sizeDiscriminatorNode'],
});

export const discriminatorNodeUnion = defineUnion('DiscriminatorNode', {
    docs: 'The composable form: any registered discriminator node.',
    members: [union('RegisteredDiscriminatorNode')],
});
