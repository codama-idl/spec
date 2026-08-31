import { attribute, boolean, defineNode, optionalAttribute, union } from '../../api';
import { examples } from './InstructionByteDeltaNode.examples';

export const instructionByteDeltaNode = defineNode('instructionByteDeltaNode', {
    docs: [
        'A byte-size delta applied when computing rent or buffer size — typically used by instructions that resize accounts.',
        'For instance, if an instruction creates a new account of 42 bytes, this node can carry that information, enabling clients to allocate the right amount of lamports to cover the cost of executing the instruction.',
    ],
    attributes: [
        attribute('withHeader', boolean(), {
            docs: [
                'Whether the delta includes the account header overhead — i.e. 128 bytes.',
                'Defaults to `false` when the value is a `resolverValueNode` and `true` otherwise.',
            ],
        }),
        optionalAttribute('subtract', boolean(), {
            docs: ['When `true`, the delta is subtracted from the running size instead of added. Defaults to `false`.'],
        }),
        attribute('value', union('instructionByteDeltaValue'), {
            docs: [
                'The source of the delta value — a literal number, a referenced account or argument, or a resolver.',
            ],
        }),
    ],
    examples,
});
