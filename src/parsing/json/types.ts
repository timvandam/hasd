export type JsonValue = JsonString | JsonObject | JsonArray | JsonNumber

export type JsonString = string
export type JsonArray = JsonValue[]
export type JsonNumber = number
export type JsonObject = {
	[key in JsonString]: JsonValue
}

export enum JsonType {
	STRING,
	NUMBER,
	ARRAY,
	OBJECT,
}

export type ParseResponse<T> = { parsed: T; remainder: string }
export type JsonParser<T extends JsonValue> = Generator<void, ParseResponse<T>, string>
