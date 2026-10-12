import { attribute, defineNode, optionalAttribute, union } from '../../../api';
import { examples } from './AmountNumberDisplayNode.examples';

export const amountNumberDisplayNode = defineNode('amountNumberDisplayNode', {
    docs: [
        'Display metadata that presents an integer as a scaled amount with an optional unit, for quantities whose scale is contextual rather than static — e.g. a raw token amount whose decimals live in the mint account.',
        'The value is divided by `10 ^ decimals` and rendered alongside `unit` (e.g. `"USDC"`, `"%"`, `"bps"`).',
        'Statically scaled quantities belong on the type instead (`fixedPointTypeNode`); for a contextual unit without scaling, use `unitNumberDisplayNode`.',
        "When both are present, a resolved display value wins for presentation; the type's static `unit` is the fallback whenever injection cannot resolve.",
    ],
    attributes: [
        attribute('decimals', union('injectableIntegerValueNode'), {
            docs: [
                'How many decimal places scale the underlying integer. Resolved as an integer value: either a literal `integerValueNode` or a key resolved from a surrounding provider.',
                'A value of `1000000` with `decimals` resolving to `6` renders as `1`.',
                'When this input cannot resolve, renderers should fall back to presenting the raw value rather than guess the scale.',
            ],
        }),
        optionalAttribute('unit', union('injectableUnitValueNode'), {
            docs: [
                'A unit appended after the scaled value (e.g. `"USDC"`, `"%"`, `"bps"`, or the address of a token mint), presented as described by `InjectableUnitValueNode`.',
                'When this input cannot resolve, renderers should present the scaled value without a unit.',
            ],
        }),
    ],
    examples,
});
