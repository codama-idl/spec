import { attribute, defineNode, optionalAttribute, union } from '../../../api';

export const conditionalValueNode = defineNode('conditionalValueNode', {
    docs: [
        'A branching contextual value.',
        'The condition resolves to a value at instruction time; that result selects between `ifTrue` and `ifFalse`.',
    ],
    attributes: [
        attribute('condition', union('ConditionalValueCondition'), {
            docs: ['The value whose evaluation drives the branch.'],
        }),
        optionalAttribute('value', union('ValueNode'), {
            docs: [
                'When present, the condition result is compared for equality against this value.',
                'Otherwise the result is treated as a boolean.',
            ],
        }),
        optionalAttribute('ifTrue', union('InstructionInputValueNode'), {
            docs: ['The value used when the condition resolves truthy (or matches `value`).'],
        }),
        optionalAttribute('ifFalse', union('InstructionInputValueNode'), {
            docs: ['The value used when the condition resolves falsy (or does not match `value`).'],
        }),
    ],
});
