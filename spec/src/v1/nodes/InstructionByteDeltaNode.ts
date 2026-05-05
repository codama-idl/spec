import { attribute, boolean, defineNode, optionalAttribute, union } from '../../api';

export const instructionByteDeltaNode = defineNode('instructionByteDeltaNode', {
    docs: 'A byte-size delta applied when computing rent or buffer size — typically used by instructions that resize accounts.',
    attributes: [
        attribute('withHeader', boolean(), {
            docs: 'Whether the delta includes the account header overhead.',
        }),
        optionalAttribute('subtract', boolean(), {
            docs: 'When `true`, the delta is subtracted from the running size instead of added. Defaults to `false`.',
        }),
        attribute('value', union('InstructionByteDeltaValue'), {
            docs: 'The source of the delta value — a literal number, a referenced account or argument, or a resolver.',
        }),
    ],
});
