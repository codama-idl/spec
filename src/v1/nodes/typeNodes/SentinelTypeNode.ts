import { attribute, defineNode, node, union } from '../../../api';

export const sentinelTypeNode = defineNode('sentinelTypeNode', {
    docs: [
        'Wraps another type and delimits it with a constant sentinel value written immediately after the wrapped type.',
    ],
    attributes: [
        attribute('type', union('TypeNode'), {
            docs: ['The wrapped type whose extent is delimited by the sentinel.'],
        }),
        attribute('sentinel', node('constantValueNode'), {
            docs: ['The constant value written immediately after the wrapped type to mark its end.'],
        }),
    ],
});
