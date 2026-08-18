import { array, attribute, defineNode, nestedUnion, union } from '../../../api';
import { examples } from './EnumTypeNode.examples';

export const enumTypeNode = defineNode('enumTypeNode', {
    docs: ['A tagged union: a numeric discriminator followed by one of several variant payloads.'],
    attributes: [
        attribute('variants', array(union('enumVariantTypeNode')), {
            docs: ['The variants of the enum, in declaration order.'],
        }),
        attribute('size', nestedUnion('nestedTypeNode', 'numberTypeNode'), {
            docs: [
                'The numeric type used to serialise the discriminator.',
                'The discriminator prepends the serialised variant payload to identify which variant was selected. By default it is the index of the variant (starting at 0), unless the variant provides its own custom discriminator value.',
            ],
        }),
    ],
    examples,
});
