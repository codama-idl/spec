import { attribute, defineNode, stringPath } from '../../../api';
import { examples } from './DataValueNode.examples';

export const dataValueNode = defineNode('dataValueNode', {
    docs: ['Refers to a value within the data of the surrounding instruction.'],
    attributes: [
        attribute('path', stringPath(), {
            docs: [
                "The path to the referenced value, relative to the instruction's data — e.g. `amount` or `config.fees[0]`.",
                'Field segments are only valid where the data type resolves to a struct (following type and account links).',
                "A path crossing a public key's `accountLink` requires reading the linked account's state. When presenting, an unresolvable path falls back as usual. When building an instruction, e.g. for a PDA seed or a default value, there is nothing to fall back to: consumers that cannot or do not read the account must fail explicitly rather than guess.",
            ],
        }),
    ],
    examples,
});
