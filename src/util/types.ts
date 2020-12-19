/**
 * Works like keyof, but gets the type of values.
 * @version 1.0.0
 * @since 1.0.0
 */
export type ValueOf<T> = T[keyof T]

/**
 * Type that has a toString() method
 */
export type HasToString = { toString(): string }
