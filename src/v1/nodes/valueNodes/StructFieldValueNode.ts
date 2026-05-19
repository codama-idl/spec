import { attribute, defineNode, stringIdentifier, union } from '../../../api';

export const structFieldValueNode = defineNode('structFieldValueNode', {
    docs: ['A named field of a `structValueNode`.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the field.'],
        }),
        attribute('value', union('ValueNode'), {
            docs: ['The concrete value of the field.'],
        }),
    ],
});
