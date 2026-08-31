import { attribute, defineNode, nestedUnion } from '../../../api';
import { examples } from './BooleanTypeNode.examples';

export const booleanTypeNode = defineNode('booleanTypeNode', {
    docs: [
        'A boolean serialised as a numeric value. The wrapped number type determines the byte width.',
        'A decoded number of `1` yields `true`; any other value yields `false`.',
    ],
    attributes: [
        attribute('size', nestedUnion('nestedTypeNode', 'numberTypeNode'), {
            docs: ['The numeric type used to serialise the boolean.'],
        }),
    ],
    examples,
});
