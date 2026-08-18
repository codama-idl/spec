import { attribute, defineNode, node, optionalAttribute, union } from '../../../api';
import { examples } from './ZeroableOptionTypeNode.examples';

export const zeroableOptionTypeNode = defineNode('zeroableOptionTypeNode', {
    docs: ['An optional value whose absence is signalled by a designated zero value rather than a presence flag.'],
    attributes: [
        attribute('item', union('typeNode'), {
            docs: ['The type carried by the option when present. Must be of fixed size.'],
        }),
        optionalAttribute('zeroValue', node('constantValueNode'), {
            docs: [
                'The constant value that signals absence. When omitted, the all-zero byte pattern of the item type is used.',
            ],
        }),
    ],
    examples,
});
