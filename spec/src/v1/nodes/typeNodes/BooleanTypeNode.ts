import { attribute, defineNode, nestedTypeNode } from '../../../api';

export const booleanTypeNode = defineNode('booleanTypeNode', {
    docs: 'A boolean serialised as a numeric value. The wrapped number type determines the byte width.',
    attributes: [
        attribute('size', nestedTypeNode('numberTypeNode'), {
            docs: 'The numeric type used to serialise the boolean.',
        }),
    ],
});
