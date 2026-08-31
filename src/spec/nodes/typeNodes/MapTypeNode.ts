import { attribute, defineNode, union } from '../../../api';
import { transformsAttribute } from '../transformNodes';
import { examples } from './MapTypeNode.examples';

export const mapTypeNode = defineNode('mapTypeNode', {
    docs: [
        'A keyed map.',
        'The key and value types are described by their respective type nodes; the entry count is determined by a count strategy.',
        'Entries are serialised one after the other, each key immediately followed by its value — e.g. key A, value A, key B, value B.',
    ],
    attributes: [
        attribute('key', union('typeNode'), {
            docs: ['The type of each entry key.'],
        }),
        attribute('value', union('typeNode'), {
            docs: ['The type of each entry value.'],
        }),
        attribute('count', union('countNode'), {
            docs: ['The strategy used to determine the number of entries.'],
        }),
        transformsAttribute(),
    ],
    examples,
});
