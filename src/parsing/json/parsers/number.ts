import { JsonNumber, JsonParser } from '../types'

/**
 * Parses numbers by capturing any characters present in numbers and calling a Number constructor
 */
export default function* JsonNumberParser(): JsonParser<JsonNumber> {
	let parsed = ''
	let chars: string

	while ((chars = yield)) {
		for (let i = 0; i < chars.length; i++) {
			const char = chars[i]
			if (char.match(/[-0-9.e]/i)) {
				parsed += char
			} else return { parsed: Number(parsed), remainder: chars.substring(i) }
		}
	}

	throw new Error('End of generator')
}
