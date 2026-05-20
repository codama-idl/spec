import { attribute, defineNode, node, optionalAttribute, stringIdentifier, union } from '../../../api';

export const enumValueNode = defineNode('enumValueNode', {
    docs: ['A concrete value of a defined enum: a variant identifier plus an optional payload.'],
    attributes: [
        attribute('variant', stringIdentifier(), {
            docs: ['The name of the selected variant.'],
        }),
        attribute('enum', node('definedTypeLinkNode'), {
            docs: ['A link to the defined enum type the value belongs to.'],
        }),
        optionalAttribute('value', union('enumValuePayload'), {
            docs: [
                'The variant payload — a struct value for struct variants or a tuple value for tuple variants.',
                'Omitted for unit variants.',
            ],
        }),
    ],
});
