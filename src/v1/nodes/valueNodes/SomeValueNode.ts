import { attribute, defineNode, union } from '../../../api';

export const someValueNode = defineNode('someValueNode', {
    docs: ['The "present" value for an optional type, wrapping a concrete value node.'],
    attributes: [
        attribute('value', union('valueNode'), {
            docs: ['The wrapped value.'],
        }),
    ],
});
