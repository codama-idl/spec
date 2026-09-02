import { attribute, defineNode, stringInteger } from '../../../api';
import { examples } from './IntegerValueNode.examples';

export const integerValueNode = defineNode('integerValueNode', {
    docs: [
        'A concrete integer value, stored as a string so the full 64- and 128-bit ranges survive JSON transport losslessly.',
        'In memory it maps to a native big integer (`bigint` in JavaScript, `i128`/`u128` in Rust); the surrounding type context narrows it to a specific width.',
    ],
    attributes: [
        attribute('value', stringInteger(), {
            docs: ['The integer value, as a base-10 string — e.g. `"42"` or `"-12048014319693667524"`.'],
        }),
    ],
    examples,
});
