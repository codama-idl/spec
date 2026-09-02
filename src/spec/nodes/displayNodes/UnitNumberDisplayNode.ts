import { attribute, defineNode, union } from '../../../api';
import { examples } from './UnitNumberDisplayNode.examples';

export const unitNumberDisplayNode = defineNode('unitNumberDisplayNode', {
    docs: [
        'Display metadata that labels a number with a contextually resolved unit, without any scaling.',
        'The one presentation form valid on numbers whose scale is already fixed — floats (which self-scale) and `fixedPointTypeNode`s (whose `scale` is static) — and equally usable on plain integers.',
        "When the type also carries a static `unit`, a resolved display unit wins for presentation; the type's unit is the fallback whenever injection cannot resolve.",
    ],
    attributes: [
        attribute('unit', union('injectableStringValueNode'), {
            docs: [
                'A label appended after the value (e.g. `"SOL"`, `"USDC"`, `"%"`). Resolved as a string value: either a literal `stringValueNode` or a key resolved from a surrounding provider.',
                'When this input cannot resolve, renderers should present the value without a unit.',
            ],
        }),
    ],
    examples,
});
