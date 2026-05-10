import { attribute, defineNode, node, optionalAttribute, union } from '../../../api';

export const zeroableOptionTypeNode = defineNode('zeroableOptionTypeNode', {
    docs: ['An optional value whose absence is signalled by a designated zero value rather than a presence flag.'],
    attributes: [
        attribute('item', union('TypeNode'), {
            docs: ['The type carried by the option when present.'],
        }),
        optionalAttribute('zeroValue', node('constantValueNode'), {
            docs: [
                'The constant value that signals absence. When omitted, the all-zero byte pattern of the item type is used.',
            ],
        }),
    ],
});
