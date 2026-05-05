import { attribute, defineNode, union } from '../../../api';

export const mapEntryValueNode = defineNode('mapEntryValueNode', {
    docs: 'A single (key, value) pair inside a `mapValueNode`.',
    attributes: [
        attribute('key', union('ValueNode'), {
            docs: 'The entry key.',
        }),
        attribute('value', union('ValueNode'), {
            docs: 'The entry value.',
        }),
    ],
});
