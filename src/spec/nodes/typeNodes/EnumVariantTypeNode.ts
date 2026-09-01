import { attribute, defineNode, docs, node, optionalAttribute, stringIdentifier, u32, union } from '../../../api';
import { examples } from './EnumVariantTypeNode.examples';

export const enumVariantTypeNode = defineNode('enumVariantTypeNode', {
    docs: [
        'A named variant of an enum, with an optional data payload.',
        'Absent `data` is a unit variant; a struct payload gives named fields, a tuple payload gives positional fields, and any other type node is carried as-is — a variant holding a single type needs no tuple around it.',
    ],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the variant.'],
        }),
        optionalAttribute('discriminator', u32(), {
            docs: [
                'Explicit discriminator value. When omitted, the discriminator is the index of the variant in the enum, starting at 0.',
            ],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the variant.'],
        }),
        optionalAttribute('data', union('typeNode'), {
            docs: ['The payload carried by the variant. When omitted, the variant is a unit variant.'],
        }),
        optionalAttribute('display', node('enumVariantDisplayNode'), {
            docs: ['Display metadata describing how the variant is presented.'],
        }),
    ],
    examples,
});
