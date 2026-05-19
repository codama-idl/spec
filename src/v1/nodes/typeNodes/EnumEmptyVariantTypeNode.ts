import { attribute, defineNode, optionalAttribute, stringIdentifier, u32 } from '../../../api';

export const enumEmptyVariantTypeNode = defineNode('enumEmptyVariantTypeNode', {
    docs: ['A unit-style variant of an enum that carries no payload.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the variant.'],
        }),
        optionalAttribute('discriminator', u32(), {
            docs: [
                'Explicit discriminator value. When omitted, the discriminator is inferred from the variant position.',
            ],
        }),
    ],
});
