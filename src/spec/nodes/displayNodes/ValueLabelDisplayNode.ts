import { attribute, defineNode, text, union } from '../../../api';
import { examples } from './ValueLabelDisplayNode.examples';

export const valueLabelDisplayNode = defineNode('valueLabelDisplayNode', {
    docs: [
        'A label presented instead of a specific value, e.g. `"All"` for an amount of `u64::MAX` or `"Never expires"` for an absent expiry.',
        "Listed in a `structFieldDisplayNode`'s `valueLabels`; it is not part of any `display` slot on its own.",
    ],
    attributes: [
        attribute('value', union('valueNode'), {
            docs: [
                "The value to label, matched structurally against the field's raw decoded value, before any display formatting, e.g. `integerValueNode('18446744073709551615')` or `noneValueNode()`.",
                "It must be a concrete value of the field's type: injected values are not resolved here.",
            ],
        }),
        attribute('label', text(), {
            docs: [
                'The label presented instead of the value, both in the fallback list and in interpolated intents (e.g. `"all SOL"`).',
                'Since the same label serves both, prefer wording that reads well as a field value and mid-sentence.',
            ],
        }),
    ],
    examples,
});
