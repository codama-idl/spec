/** A semver-shaped version string (e.g. "1.6.0"). */
export type Version = `${number}.${number}.${number}`;

/**
 * The Codama spec version this package describes. Pinned to the literal
 * version of the spec at generation time; documents conforming to this
 * version of the spec carry this exact string.
 */
export type CodamaVersion = '1.6.0';
