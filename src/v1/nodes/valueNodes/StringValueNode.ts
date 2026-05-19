import { attribute, defineNode, string } from '../../../api';

export const stringValueNode = defineNode('stringValueNode', {
    docs: ['A concrete string value.'],
    attributes: [
        attribute('string', string(), {
            docs: ['The string value.'],
        }),
    ],
});
