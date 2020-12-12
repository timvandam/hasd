import { JsonArray, JsonParser, JsonValue } from '../types'
import { chooseParser } from '../index'

export default function* JsonArrayParser(): JsonParser<JsonArray> {
	let parsed: JsonArray = []

	let chars = (yield).substring(1) // consume the first delimiter

	let parser: JsonParser<JsonValue> | undefined
	let expectingComma = false

	do {
		if (!parser) {
			// No parser, so find the parser for the current value.
			for (let i = 0; i < chars.length; i++) {
				const char = chars[i]
				// White spaces don't matter if were not parsing any type, just skip them
				if (char.match(/\s/)) continue
				// Arrays can close whenever there is no current parser
				if (char === ']') return { parsed, remainder: chars.substring(i + 1) }
				// If we are expecting a delimiter verify that we get one
				if (expectingComma) {
					if (char === ',') {
						expectingComma = false
						continue
					} else throw new Error(`Expected a , but received '${char}'`)
				}

				// The current character is part of whatever we want to parse
				// Pick an appropriate parser and start parsing
				parser = chooseParser(char)
				parser.next()
				chars = chars.substring(i)
				break
			}

			if (!parser) continue // Possibly only received spaces or comma
		}
		const { done, value } = parser.next(chars)
		if (done) {
			if (value) {
				parsed.push(value.parsed)
				chars = value.remainder
				parser = undefined
				expectingComma = true
			} else throw new Error('Array element parser closed without returning a value')
		}
	} while (chars.length || (chars = yield))

	throw new Error('End of generator')
}
