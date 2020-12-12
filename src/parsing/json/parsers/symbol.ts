import { JsonNumber, JsonParser, JsonSymbol, JsonToken } from '../types'

/**
 * Parses numbers, booleans and null
 */
/*export default function* JsonTokenParser(): JsonParser<JsonToken> {
	let chars = yield
	const firstChar = chars[0]
	let parser: JsonParser<JsonToken>
	if (firstChar.match(/[0-9]/)) parser = JsonNumberParser()
	else if (firstChar === 'n') parser = JsonNullParser()
	else if (firstChar === 't') parser = JsonTrueParser()
	else if (firstChar === 'f') parser = JsonFalseParser()
	else throw new Error(`Invalid character in token parser '${firstChar}'`)

	parser.next()

	do {
		const { done, value } = parser.next(chars)
		if (done) {
			if (value) return value
			throw new Error('Token parser closed without returning a value')
		}
	} while ((chars = yield))

	return { parsed: null, remainder: '' }
}*/

/**
 * Parses json symbols: json values that appear in just one form (e.g. true, false, null)
 * @param expected Expected character sequence
 * @param returnValue Return value in case the character sequence matches
 */
export default function* JsonSymbolParser(expected: string, returnValue: JsonSymbol): JsonParser<JsonSymbol> {
	let chars: string

	while ((chars = yield)) {
		for (let i = 0; i < chars.length; i++) {
			const char = chars[i]
			if (char !== expected[0]) throw new Error(`Unexpected character in symbol parser '${char}'`)
			expected = expected.substring(1)
			if (!expected.length) return { parsed: returnValue, remainder: chars.substring(i + 1) }
		}
	}

	throw new Error('End of generator')
}
