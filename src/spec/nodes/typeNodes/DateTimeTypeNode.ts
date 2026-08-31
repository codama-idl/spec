import { attribute, defineNode, node } from '../../../api';
import { transformsAttribute } from '../transformNodes';
import { examples } from './DateTimeTypeNode.examples';

export const dateTimeTypeNode = defineNode('dateTimeTypeNode', {
    docs: [
        'A timestamp encoded as a number, typically seconds since the Unix epoch. The inner number type determines the byte width.',
    ],
    attributes: [
        attribute('number', node('numberTypeNode'), {
            docs: ['The numeric type used to serialise the timestamp.'],
        }),
        transformsAttribute(),
    ],
    examples,
});
