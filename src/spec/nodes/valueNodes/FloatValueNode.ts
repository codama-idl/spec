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
                'The canonical decimal value — e.g. `"1.5"`, `"-0.25"` or `"602000000"`; never `"1.50"`, `".5"` or `"6.02e8"`. The specials `"NaN"`, `"Infinity"` and `"-Infinity"` are permitted, and `"-0"` is valid since floats have signed zero.',
                'The single spelling guarantees that two equal values can never have distinct node representations, so structural comparison, hashing and deduplication never diverge on formatting. It canonicalises the decimal string\u2019s spelling, not the binary float it rounds to — `"0.1"` and a 30-digit decimal that rounds to the same f64 are distinct, individually canonical values.',
            ],
        }),
    ],
    examples,
});
