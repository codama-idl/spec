import { attribute, defineNode, node } from '../../../api';
import { examples } from './PrefixedCountNode.examples';

export const prefixedCountNode = defineNode('prefixedCountNode', {
    docs: [
        'A count strategy where the number of items is read from a numeric prefix.',
        'This enables nodes such as `arrayTypeNode` to represent collections whose length is stored as a prefix.',
    ],
    attributes: [
        attribute('prefix', node('numberTypeNode'), {
            docs: ['The numeric type used as the count prefix.'],
        }),
    ],
    examples,
});
