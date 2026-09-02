import { attribute, defineNode, literalUnion, node, optionalAttribute, string, u32 } from '../../../api';
import { transformsAttribute } from '../transformNodes';
import { examples } from './FixedPointTypeNode.examples';

export const fixedPointTypeNode = defineNode('fixedPointTypeNode', {
    docs: [
        'A scaled quantity stored as an integer: the value is `raw / base^scale`.',
        'Integers are the safe way to carry financial values; this node adds the scaling and unit that give the raw integer its meaning — e.g. token amounts, prices, or binary Q-format fractions.',
    ],
    attributes: [
        attribute('scale', u32(), {
            docs: [
                'How many powers of `base` divide the raw integer. An integer value of 12345 with a base-10 scale of 2 represents 123.45.',
                'Must be non-zero: an unscaled quantity is an `integerTypeNode` with a `unit`.',
            ],
        }),
        optionalAttribute('base', literalUnion(2, 10), {
            docs: ['The base the scale applies to. Defaults to `10`; use `2` for binary Q-format fractions.'],
        }),
        optionalAttribute('unit', string(), {
            docs: ['The unit of measure the quantity denotes — e.g. `"SOL"`, `"USDC"` or `"%"`.'],
        }),
        attribute('number', node('integerTypeNode'), {
            docs: [
                'The integer type used to serialise the raw value — a pure encoding slot.',
                'It must use a fixed-size format, because a fixed point presupposes a fixed bit width — most visibly for binary Q-format fractions, whose layout is defined by that width. Variable-size formats such as `shortU16` therefore cannot anchor one.',
                'It must not carry a `unit` or `display` of its own.',
            ],
        }),
        optionalAttribute('display', node('unitNumberDisplayNode'), {
            docs: [
                'Display metadata describing how the quantity is presented — a contextual unit resolved via injection on top of the static scale.',
            ],
        }),
        transformsAttribute(),
    ],
    examples,
});
