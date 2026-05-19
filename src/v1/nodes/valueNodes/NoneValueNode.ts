import { defineNode } from '../../../api';

export const noneValueNode = defineNode('noneValueNode', {
    docs: ['The "absent" value for an optional type.'],
    attributes: [],
});
