import { array, attribute, defineNode, nestedTypeNode, union } from '../../../api';

export const enumTypeNode = defineNode('enumTypeNode', {
    docs: 'A tagged union: a numeric discriminator followed by one of several variant payloads.',
    attributes: [
        attribute('variants', array(union('EnumVariantTypeNode')), {
            docs: 'The variants of the enum, in declaration order.',
        }),
        attribute('size', nestedTypeNode('numberTypeNode'), {
            docs: 'The numeric type used to serialise the discriminator.',
        }),
    ],
});
