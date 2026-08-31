import { attribute, defineNode, u64 } from '../../../api';
import { examples } from './FixedCountNode.examples';

export const fixedCountNode = defineNode('fixedCountNode', {
    docs: [
        'A count strategy that fixes the number of items at a constant value.',
        'This enables nodes such as `arrayTypeNode` to represent collections of a fixed length.',
    ],
    attributes: [
        attribute('value', u64(), {
            docs: ['The fixed number of items.'],
        }),
    ],
    examples,
});
