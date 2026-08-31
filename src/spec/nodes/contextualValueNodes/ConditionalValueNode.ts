import { attribute, defineNode, optionalAttribute, union } from '../../../api';
import { examples } from './ConditionalValueNode.examples';

export const conditionalValueNode = defineNode('conditionalValueNode', {
    docs: [
        'A branching contextual value.',
        'The condition resolves to a value at instruction time; that result selects between `ifTrue` and `ifFalse`.',
    ],
    attributes: [
        attribute('condition', union('conditionalValueCondition'), {
            docs: ['The value whose evaluation drives the branch.'],
        }),
        optionalAttribute('value', union('valueNode'), {
            docs: [
                'When present, the condition result is compared for equality against this value.',
                'When omitted, the condition passes if the referenced account or argument exists in the current context, regardless of its value.',
            ],
        }),
        optionalAttribute('ifTrue', union('instructionInputValueNode'), {
            docs: ['The value used when the condition passes — i.e. it matches `value` or, without a `value`, exists.'],
        }),
        optionalAttribute('ifFalse', union('instructionInputValueNode'), {
            docs: [
                'The value used when the condition fails — i.e. it does not match `value` or, without a `value`, does not exist.',
            ],
        }),
    ],
    examples,
});
