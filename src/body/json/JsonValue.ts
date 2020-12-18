/**
 * JSON Value type.
 * @version 1.0.0
 * @since 1.0.0
 */
export type JsonValue =
	| string
	| number
	| null
	| boolean
	| JsonValue[]
	| { [key in string | number | symbol]: JsonValue }
