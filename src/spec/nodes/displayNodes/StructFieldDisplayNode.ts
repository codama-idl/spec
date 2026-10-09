import { array, boolean, defineNode, enumeration, node, optionalAttribute, text } from '../../../api';
import { examples } from './StructFieldDisplayNode.examples';

export const structFieldDisplayNode = defineNode('structFieldDisplayNode', {
    docs: [
        'Display metadata for a named member: its label, whether it is shown in the fallback list, whether it is flattened into its parent, and labels for specific values.',
        "Value presentation is otherwise carried by the member's type; this node addresses naming and composition, and value labels override the presentation of the values they match.",
    ],
    attributes: [
        optionalAttribute('label', text(), {
            docs: [
                'An override label shown for the member (e.g. `"Amount"`).',
                'When absent, renderers derive a label from the member `identifier`.',
            ],
        }),
        optionalAttribute('skip', enumeration('displaySkip'), {
            docs: ['Whether the member is shown in the fallback list. Defaults to `"never"` (always shown).'],
        }),
        optionalAttribute('flatten', boolean(), {
            docs: [
                "When `true`, the member's type is expected to be a struct and its fields are lifted into the parent's context, dropping the field name as an extra level of nesting.",
                'Flattening lives on the field rather than on the struct so the same struct can be flattened in one place and nested in another.',
                "Meaningful only when the member's type is structurally a struct; renderers ignore it otherwise.",
            ],
        }),
        optionalAttribute('flattenPrefix', text(), {
            docs: [
                'A literal prefix prepended to each flattened member\'s label (e.g. `"args."`).',
                'Meaningful only when `flatten` is `true`. Useful to disambiguate when two flattened children might collide.',
            ],
        }),
        optionalAttribute('valueLabels', array(node('valueLabelDisplayNode')), {
            docs: [
                'Labels presented instead of specific values of the member, e.g. `"All"` for `u64::MAX`. When the member\'s raw decoded value, before any display formatting, matches a label\'s `value` structurally, renderers present the label instead of the formatted value, including in interpolated intents.',
                "When several labels match, the first one wins. A matching label is presented as the member's single value, even when `flatten` is `true`.",
            ],
        }),
    ],
    examples,
});
