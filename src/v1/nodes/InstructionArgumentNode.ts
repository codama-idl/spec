import { attribute, defineNode, docs, enumeration, node, optionalAttribute, stringIdentifier, union } from '../../api';

export const instructionArgumentNode = defineNode('instructionArgumentNode', {
    docs: ['A named argument of an instruction, with its type and an optional default value.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the argument.'],
        }),
        optionalAttribute('defaultValueStrategy', enumeration('defaultValueStrategy'), {
            docs: ['How a configured default value is exposed in generated APIs. Required when `defaultValue` is set.'],
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
});
