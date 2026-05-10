import { attribute, defineNode, f64 } from '../../../api';

export const numberValueNode = defineNode('numberValueNode', {
    docs: [
        'A concrete numeric value.',
        'Stored as a 64-bit float; consumers narrow to a specific integer or float width based on the surrounding type context.',
    ],
    attributes: [
        attribute('number', f64(), {
            docs: ['The numeric value.'],
        }),
    ],
});
