import { attribute, defineNode, docs, enumeration, node, optionalAttribute, stringIdentifier, union } from '../../api';
import { examples } from './InstructionArgumentNode.examples';

export const instructionArgumentNode = defineNode('instructionArgumentNode', {
    docs: [
        'A named argument of an instruction, with its type and an optional default value.',
        'Serialised next to each other, the arguments of an instruction form its data.',
        '',
        '![Diagram](https://github.com/codama-idl/codama/assets/3642397/7e2def82-949a-4663-bdc3-ac599d39d2d2)',
    ],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the argument.'],
        }),
        optionalAttribute('defaultValueStrategy', enumeration('defaultValueStrategy'), {
            docs: [
                'How a configured default value is exposed in generated APIs.',
                'Only relevant when `defaultValue` is set; when absent, `optional` is assumed.',
            ],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the argument.'],
        }),
        attribute('type', union('typeNode'), {
            docs: ['The type of the argument.'],
        }),
        optionalAttribute('defaultValue', union('instructionInputValueNode'), {
            docs: ['A default value used when the argument is omitted by callers.'],
        }),
        optionalAttribute('display', node('structFieldDisplayNode'), {
            docs: ['Display metadata describing how the argument is presented.'],
        }),
    ],
    examples,
});
