import { attribute, defineNode, node } from '../../../api';
import { transformsAttribute } from '../transformNodes';
import { examples } from './BooleanTypeNode.examples';

export const booleanTypeNode = defineNode('booleanTypeNode', {
    docs: [
        'A boolean serialised as an integer. The inner integer type determines the byte width.',
        'A decoded number of `1` yields `true`; any other value yields `false`.',
    ],
    attributes: [
        attribute('size', node('integerTypeNode'), {
            docs: ['The integer type used to serialise the boolean.'],
        }),
        transformsAttribute(),
    ],
    examples,
});
