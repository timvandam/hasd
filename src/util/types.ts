/**
 * Works like keyof, but gets the type of values.
 * @version 1.0.0
 * @since 1.0.0
 */
export type ValueOf<T> = T[keyof T]
