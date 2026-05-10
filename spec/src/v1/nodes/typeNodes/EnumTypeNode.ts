import { array, attribute, defineNode, nestedUnion, union } from '../../../api';

export const enumTypeNode = defineNode('enumTypeNode', {
    docs: ['A tagged union: a numeric discriminator followed by one of several variant payloads.'],
    attributes: [
        attribute('variants', array(union('EnumVariantTypeNode')), {
            docs: ['The variants of the enum, in declaration order.'],
        }),
        attribute('size', nestedUnion('NestedTypeNode', 'numberTypeNode'), {
            docs: ['The numeric type used to serialise the discriminator.'],
        }),
    ],
});
