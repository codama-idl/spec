import { attribute, defineNode, stringPath, u64 } from '../../../api';
import { examples } from './FieldDiscriminatorNode.examples';

export const fieldDiscriminatorNode = defineNode('fieldDiscriminatorNode', {
    docs: ['Identifies a node by the value of a field at a known byte offset.'],
    attributes: [
        attribute('path', stringPath(), {
            docs: [
                'The path to the discriminating field, relative to the account or instruction data — e.g. `discriminator` or `header.kind`.',
                'Field segments are only valid where the data type resolves to a struct (following links).',
            ],
        }),
        attribute('offset', u64(), {
            docs: ['The byte offset of the field.'],
        }),
    ],
    examples,
});
