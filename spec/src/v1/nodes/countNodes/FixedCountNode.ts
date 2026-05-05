import { attribute, defineNode, u64 } from '../../../api';

export const fixedCountNode = defineNode('fixedCountNode', {
    docs: 'A count strategy that fixes the number of items at a constant value.',
    attributes: [
        attribute('value', u64(), {
            docs: 'The fixed number of items.',
        }),
    ],
});
