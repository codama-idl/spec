import { attribute, defineNode, union } from '../../../api';

export const mapTypeNode = defineNode('mapTypeNode', {
    docs: [
        'A keyed map.',
        'The key and value types are described by their respective type nodes; the entry count is determined by a count strategy.',
    ],
    attributes: [
        attribute('key', union('TypeNode'), {
            docs: ['The type of each entry key.'],
        }),
        attribute('value', union('TypeNode'), {
            docs: ['The type of each entry value.'],
        }),
        attribute('count', union('CountNode'), {
            docs: ['The strategy used to determine the number of entries.'],
        }),
    ],
});
