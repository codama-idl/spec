import { attribute, boolean, defineNode } from '../../../api';

export const booleanValueNode = defineNode('booleanValueNode', {
    docs: ['A concrete boolean value.'],
    attributes: [
        attribute('boolean', boolean(), {
            docs: ['The boolean value.'],
        }),
    ],
});
