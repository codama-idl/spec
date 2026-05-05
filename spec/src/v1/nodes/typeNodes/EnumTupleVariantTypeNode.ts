import { attribute, defineNode, nestedTypeNode, optionalAttribute, stringIdentifier, u32 } from '../../../api';

export const enumTupleVariantTypeNode = defineNode('enumTupleVariantTypeNode', {
    docs: 'A variant of an enum that carries a tuple payload (positional fields).',
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: 'The name of the variant.',
        }),
        optionalAttribute('discriminator', u32(), {
            docs: 'Explicit discriminator value. When omitted, the discriminator is inferred from the variant position.',
        }),
        attribute('tuple', nestedTypeNode('tupleTypeNode'), {
            docs: 'The tuple of positional fields carried by the variant.',
        }),
    ],
});
