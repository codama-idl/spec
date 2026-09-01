import { attribute, defineNode, stringPath } from '../../../api';
import { examples } from './ArgumentValueNode.examples';

export const argumentValueNode = defineNode('argumentValueNode', {
    docs: ['Refers to a value within the data of the surrounding instruction.'],
    attributes: [
        attribute('path', stringPath(), {
            docs: [
                "The path to the referenced value, relative to the instruction's data — e.g. `amount` or `config.fees[0]`.",
                'Field segments are only valid where the data type resolves to a struct (following links).',
            ],
        }),
    ],
    examples,
});
