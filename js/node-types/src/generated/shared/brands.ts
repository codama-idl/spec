/**
 * A string asserted to be in camelCase form.
 *
 * The brand is purely a TypeScript marker; runtime parsing and validation
 * happen wherever string identifiers cross the package boundary.
 */
export type CamelCaseString = string & {
    readonly ['__stringCase:codama']: 'camelCase';
};

/**
 * A string asserted to be in kebabCase form.
 *
 * The brand is purely a TypeScript marker; runtime parsing and validation
 * happen wherever string identifiers cross the package boundary.
 */
export type KebabCaseString = string & {
    readonly ['__stringCase:codama']: 'kebabCase';
};

/**
 * A string asserted to be in pascalCase form.
 *
 * The brand is purely a TypeScript marker; runtime parsing and validation
 * happen wherever string identifiers cross the package boundary.
 */
export type PascalCaseString = string & {
    readonly ['__stringCase:codama']: 'pascalCase';
};

/**
 * A string asserted to be in snakeCase form.
 *
 * The brand is purely a TypeScript marker; runtime parsing and validation
 * happen wherever string identifiers cross the package boundary.
 */
export type SnakeCaseString = string & {
    readonly ['__stringCase:codama']: 'snakeCase';
};

/**
 * A string asserted to be in titleCase form.
 *
 * The brand is purely a TypeScript marker; runtime parsing and validation
 * happen wherever string identifiers cross the package boundary.
 */
export type TitleCaseString = string & {
    readonly ['__stringCase:codama']: 'titleCase';
};
