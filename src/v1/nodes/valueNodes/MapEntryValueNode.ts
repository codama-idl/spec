import { attribute, defineNode, union } from '../../../api';
import { examples } from './MapEntryValueNode.examples';

export const mapEntryValueNode = defineNode('mapEntryValueNode', {
    docs: [
        'A single (key, value) pair inside a `mapValueNode`.',
        'For example, the map `{ total: 42 }` has one entry whose key is the string `"total"` and whose value is the number `42`.',
    ],
    attributes: [
        attribute('key', union('valueNode'), {
            docs: ['The entry key.'],
        }),
        attribute('value', union('valueNode'), {
            docs: ['The entry value.'],
        }),
    ],
    examples,
});
