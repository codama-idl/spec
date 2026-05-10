import { attribute, defineNode, stringIdentifier, u64 } from '../../../api';

export const fieldDiscriminatorNode = defineNode('fieldDiscriminatorNode', {
    docs: ['Identifies a node by the value of a named field at a known byte offset.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the discriminating field.'],
        }),
        attribute('offset', u64(), {
            docs: ['The byte offset of the field.'],
        }),
    ],
});
