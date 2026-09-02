import { attribute, defineNode, stringDecimal } from '../../../api';
import { examples } from './FloatValueNode.examples';

export const floatValueNode = defineNode('floatValueNode', {
    docs: [
        'A concrete floating-point value, stored as a string so round-trips are deterministic across serialisers.',
        'The surrounding type context narrows it to a specific width.',
    ],
    attributes: [
        attribute('value', stringDecimal(), {
            docs: [
                'The decimal value — e.g. `"1.5"`, `"-0.25"` or `"6.02e23"`. The specials `"NaN"`, `"Infinity"` and `"-Infinity"` are permitted.',
            ],
        }),
    ],
    examples,
});
