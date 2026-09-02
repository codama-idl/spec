import { defineNode, optionalAttribute, union } from '../../../api';
import { examples } from './AmountNumberDisplayNode.examples';

export const amountNumberDisplayNode = defineNode('amountNumberDisplayNode', {
    docs: [
        'Display metadata that presents a number as a scaled amount with an optional unit, for quantities whose scale or unit are contextual rather than static — e.g. a raw token amount whose decimals live in the mint account.',
        'The value is divided by `10 ^ decimals` and rendered alongside `unit` (e.g. `"USDC"`, `"%"`, `"bps"`).',
        'When the type itself carries static semantics (`fixedPointTypeNode`, a unit-ed `integerTypeNode`), renderers should use those; restating static facts here is discouraged — this node exists for values resolved at presentation time via injection.',
        "When both are present, a resolved display value wins for presentation; the type's static `unit` and scale are the fallback whenever injection cannot resolve.",
    ],
    attributes: [
        optionalAttribute('decimals', union('injectableIntegerValueNode'), {
            docs: [
                'How many decimal places scale the underlying integer. Resolved as an integer value: either a literal `integerValueNode` or a key resolved from a surrounding provider.',
                'A value of `1000000` with `decimals` resolving to `6` renders as `1`.',
                'When this input cannot resolve, renderers should fall back to presenting the raw value rather than guess the scale.',
            ],
        }),
        optionalAttribute('unit', union('injectableStringValueNode'), {
            docs: [
                'A label appended after the scaled value (e.g. `"USDC"`, `"%"`, `"bps"`). Resolved as a string value: either a literal `stringValueNode` or a key resolved from a surrounding provider.',
                'When this input cannot resolve, renderers should present the scaled value without a unit.',
            ],
        }),
    ],
    examples,
});
