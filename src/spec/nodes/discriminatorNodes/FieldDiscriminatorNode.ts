import { attribute, defineNode, stringIdentifier, u64 } from '../../../api';
import { examples } from './FieldDiscriminatorNode.examples';

export const fieldDiscriminatorNode = defineNode('fieldDiscriminatorNode', {
    docs: ['Identifies a node by the value of a named field at a known byte offset.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: [
                'The name of the discriminating field — a `structFieldTypeNode` of the account data or an argument of the instruction.',
            ],
        }),
        attribute('offset', u64(), {
            docs: ['The byte offset of the field.'],
        }),
    ],
    examples,
});
