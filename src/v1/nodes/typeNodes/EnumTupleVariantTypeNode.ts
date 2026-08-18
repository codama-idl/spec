import { attribute, defineNode, nestedUnion, node, optionalAttribute, stringIdentifier, u32 } from '../../../api';
import { examples } from './EnumTupleVariantTypeNode.examples';

export const enumTupleVariantTypeNode = defineNode('enumTupleVariantTypeNode', {
    docs: ['A variant of an enum that carries a tuple payload (positional fields).'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the variant.'],
        }),
        optionalAttribute('discriminator', u32(), {
            docs: [
                'Explicit discriminator value. When omitted, the discriminator is the index of the variant in the enum, starting at 0.',
            ],
        }),
        attribute('tuple', nestedUnion('nestedTypeNode', 'tupleTypeNode'), {
            docs: ['The tuple of positional fields carried by the variant.'],
        }),
        optionalAttribute('display', node('enumVariantDisplayNode'), {
            docs: ['Display metadata describing how the variant is presented.'],
        }),
    ],
    examples,
});
