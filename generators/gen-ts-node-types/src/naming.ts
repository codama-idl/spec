/**
 * Naming helpers shared across renderers.
 */

/** Convert a camelCase string to PascalCase by uppercasing the first letter. */
export function pascalCase(str: string): string {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert an attribute name to its corresponding generic parameter name.
 *
 * `data` → `TData`
 * `pda` → `TPda`
 * `discriminators` → `TDiscriminators`
 */
export function genericParamName(attributeName: string): string {
    return `T${pascalCase(attributeName)}`;
}
