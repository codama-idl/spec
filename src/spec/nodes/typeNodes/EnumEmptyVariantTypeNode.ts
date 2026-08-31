import { attribute, defineNode, node, optionalAttribute, stringIdentifier, u32 } from '../../../api';
import { examples } from './EnumEmptyVariantTypeNode.examples';

export const enumEmptyVariantTypeNode = defineNode('enumEmptyVariantTypeNode', {
    docs: ['A unit-style variant of an enum that carries no payload.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the variant.'],
        }),
        optionalAttribute('discriminator', u32(), {
            docs: [
                'Explicit discriminator value. When omitted, the discriminator is the index of the variant in the enum, starting at 0.',
            ],
        }),
        optionalAttribute('display', node('enumVariantDisplayNode'), {
            docs: ['Display metadata describing how the variant is presented.'],
        }),
    ],
    examples,
});
