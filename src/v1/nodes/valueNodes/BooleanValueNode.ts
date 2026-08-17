import { attribute, boolean, defineNode } from '../../../api';
import { examples } from './BooleanValueNode.examples';

export const booleanValueNode = defineNode('booleanValueNode', {
    docs: ['A concrete boolean value.'],
    attributes: [
        attribute('boolean', boolean(), {
            docs: ['The boolean value.'],
        }),
    ],
    examples,
});
