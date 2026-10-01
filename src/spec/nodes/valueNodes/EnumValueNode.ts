import { attribute, defineNode, node, optionalAttribute, stringIdentifier, union } from '../../../api';
import { examples } from './EnumValueNode.examples';

export const enumValueNode = defineNode('enumValueNode', {
    docs: ['A concrete value of a defined enum: a variant identifier plus an optional payload.'],
    attributes: [
        attribute('variant', stringIdentifier(), {
            docs: ['The identifier of the selected variant.'],
        }),
        attribute('enum', node('definedTypeLinkNode'), {
            docs: [
                'A link to the defined enum type the value belongs to.',
                'The linked defined type must contain an `enumTypeNode`.',
            ],
        }),
        optionalAttribute('value', union('valueNode'), {
            docs: [
                "The value of the variant's `data` — any value node matching its type, e.g. a struct value for a struct payload or an integer value for an integer payload.",
                'Omitted for variants without data.',
            ],
        }),
    ],
    examples,
});
