import { attribute, defineNode, node, u64 } from '../../../api';

export const constantDiscriminatorNode = defineNode('constantDiscriminatorNode', {
    docs: ['Identifies a node by a constant value at a known byte offset (e.g. a magic header).'],
    attributes: [
        attribute('offset', u64(), {
            docs: ['The byte offset at which the constant begins.'],
        }),
        attribute('constant', node('constantValueNode'), {
            docs: ['The constant value expected at the offset.'],
        }),
    ],
});
