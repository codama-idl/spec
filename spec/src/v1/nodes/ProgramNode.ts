import {
    array,
    attribute,
    defineNode,
    docs,
    enumeration,
    node,
    optionalAttribute,
    string,
    stringIdentifier,
    stringVersion,
} from '../../api';

export const programNode = defineNode('programNode', {
    docs: 'A Solana program: its identity, version, accounts, instructions, defined types, PDAs, events, errors, and constants.',
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: 'The name of the program.',
        }),
        attribute('publicKey', string(), {
            docs: 'The base58-encoded program ID.',
        }),
        attribute('version', stringVersion(), {
            docs: 'The version of the program, in semver form.',
        }),
        optionalAttribute('origin', enumeration('ProgramOrigin'), {
            docs: 'The toolchain that originally generated the program description, if known.',
        }),
        optionalAttribute('docs', docs(), {
            docs: 'Markdown documentation for the program.',
        }),
        attribute('accounts', array(node('accountNode')), {
            docs: 'The accounts owned by the program.',
        }),
        attribute('instructions', array(node('instructionNode')), {
            docs: 'The instructions exposed by the program.',
        }),
        attribute('definedTypes', array(node('definedTypeNode')), {
            docs: 'The reusable types defined by the program.',
        }),
        attribute('pdas', array(node('pdaNode')), {
            docs: 'The PDAs derived by the program.',
        }),
        attribute('events', array(node('eventNode')), {
            docs: 'The events emitted by the program.',
        }),
        attribute('errors', array(node('errorNode')), {
            docs: 'The errors returned by the program.',
        }),
        attribute('constants', array(node('constantNode')), {
            docs: 'The constants exposed by the program.',
        }),
    ],
});
