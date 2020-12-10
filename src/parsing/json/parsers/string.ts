import { JsonParser, JsonString } from '../types'

export default function* JsonStringParser(): JsonParser<JsonString> {
	let parsed = ''

	let chars = (yield).substring(1) // consume the first delimiter

	let escaped = false

	do {
		for (let i = 0; i < chars.length; i++) {
			const char = chars[i]
			if (escaped) {
				parsed += char
				escaped = false
			} else if (char === '\\') {
				escaped = true
			} else if (char === '"') {
				return { parsed, remainder: chars.substring(i + 1) }
			} else parsed += char
		}
	} while ((chars = yield))

	return { parsed, remainder: '' }
}
