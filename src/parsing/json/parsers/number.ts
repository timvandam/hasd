import { JsonNumber, JsonParser } from '../types'

// TODO: Generic parser for tokens (or symbols or whatever, anything that does not use delimiters)
export default function* JsonNumberParser(): JsonParser<JsonNumber> {
	let parsed = ''

	let chars: string

	while ((chars = yield)) {
		for (let i = 0; i < chars.length; i++) {
			const char = chars[i]
			// TODO: use an array and compute the number manually
			// TODO: use states to check characters
			if (char.match(/[-0-9.e]/i)) {
				parsed += char
			} else return { parsed: Number(parsed), remainder: chars.substring(i + 1) }
		}
	}

	return { parsed: Number(parsed), remainder: '' }
}
