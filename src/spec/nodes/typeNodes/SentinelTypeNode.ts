import { attribute, defineNode, node, union } from '../../../api';
import { examples } from './SentinelTypeNode.examples';

export const sentinelTypeNode = defineNode('sentinelTypeNode', {
    docs: [
        'Wraps another type and delimits it with a constant sentinel value written immediately after the wrapped type.',
        '',
        'When decoding, the wrapped type is decoded until the sentinel value is encountered, at which point decoding stops and the sentinel is discarded.',
        '',
        '> [!IMPORTANT]',
        '> For this node to work, the sentinel value must never occur within the encoded bytes of the wrapped type.',
    ],
    attributes: [
        attribute('type', union('typeNode'), {
            docs: ['The wrapped type whose extent is delimited by the sentinel.'],
        }),
        attribute('sentinel', node('constantValueNode'), {
            docs: ['The constant value written immediately after the wrapped type to mark its end.'],
        }),
    ],
    examples,
});
