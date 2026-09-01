import { attribute, defineNode, stringIdentifier, union } from '../../../api';
import { examples } from './StructFieldValueNode.examples';

export const structFieldValueNode = defineNode('structFieldValueNode', {
    docs: ['A named field of a `structValueNode`.'],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the field.'],
        }),
        attribute('value', union('valueNode'), {
            docs: ['The concrete value of the field.'],
        }),
    ],
    examples,
});
