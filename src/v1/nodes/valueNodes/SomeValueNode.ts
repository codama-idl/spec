import { attribute, defineNode, union } from '../../../api';
import { examples } from './SomeValueNode.examples';

export const someValueNode = defineNode('someValueNode', {
    docs: [
        'The "present" value for an optional type, wrapping a concrete value node.',
        'For instance, this can be set as the default value of a field whose type is an `optionTypeNode`.',
    ],
    attributes: [
        attribute('value', union('valueNode'), {
            docs: ['The wrapped value.'],
        }),
    ],
    examples,
});
