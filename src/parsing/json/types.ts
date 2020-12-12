export type JsonValue = JsonString | JsonObject | JsonArray | JsonNumber | JsonBoolean | JsonNull

/**
 * Tokens are json values without delimiters
 */
export type JsonToken = JsonNumber | JsonBoolean | JsonNull

/**
 * Symbols are json values that have just one exact form (null, true, false)
 */
export type JsonSymbol = JsonBoolean | JsonNull

export type JsonString = string
export type JsonArray = JsonValue[]
export type JsonObject = {
	[key in JsonString]: JsonValue
}
export type JsonNumber = number
export type JsonBoolean = boolean
export type JsonNull = null

export enum JsonType {
	STRING,
	NUMBER,
	ARRAY,
	OBJECT,
}

export type ParseResponse<T> = { parsed: T; remainder: string }
export type JsonParser<T extends JsonValue> = Generator<void, ParseResponse<T>, string>
