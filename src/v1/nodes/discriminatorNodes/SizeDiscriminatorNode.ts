import { attribute, defineNode, u64 } from '../../../api';

export const sizeDiscriminatorNode = defineNode('sizeDiscriminatorNode', {
    docs: ['Identifies a node by its expected total byte size.'],
    attributes: [
        attribute('size', u64(), {
            docs: ['The expected byte size.'],
        }),
    ],
});
