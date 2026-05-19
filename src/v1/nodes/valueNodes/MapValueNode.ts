import { array, attribute, defineNode, node } from '../../../api';

export const mapValueNode = defineNode('mapValueNode', {
    docs: ['A concrete map value: a list of (key, value) entries.'],
    attributes: [
        attribute('entries', array(node('mapEntryValueNode')), {
            docs: ['The entries of the map, in order.'],
        }),
    ],
});
