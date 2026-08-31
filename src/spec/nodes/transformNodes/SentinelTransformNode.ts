import { attribute, defineNode, node } from '../../../api';
import { examples } from './SentinelTransformNode.examples';

export const sentinelTransformNode = defineNode('sentinelTransformNode', {
    docs: [
        'Delimits the transformed type with a constant sentinel value written immediately after it.',
        '',
        'When decoding, the transformed type is decoded until the sentinel value is encountered, at which point decoding stops and the sentinel is discarded.',
        '',
        '> [!IMPORTANT]',
        '> For this transform to work, the sentinel value must never occur within the encoded bytes of the transformed type.',
    ],
    attributes: [
        attribute('sentinel', node('constantValueNode'), {
            docs: ['The constant value written immediately after the transformed type to mark its end.'],
        }),
    ],
    examples,
});
