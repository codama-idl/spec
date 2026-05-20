import { attribute, defineNode, nestedUnion, optionalAttribute, stringIdentifier, u32 } from '../../../api';

export const enumStructVariantTypeNode = defineNode('enumStructVariantTypeNode', {
    docs: ['A variant of an enum that carries a struct payload (named fields).'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the variant.'],
        }),
        optionalAttribute('discriminator', u32(), {
            docs: [
                'Explicit discriminator value. When omitted, the discriminator is inferred from the variant position.',
            ],
        }),
        attribute('struct', nestedUnion('nestedTypeNode', 'structTypeNode'), {
            docs: ['The struct of named fields carried by the variant.'],
        }),
    ],
});
