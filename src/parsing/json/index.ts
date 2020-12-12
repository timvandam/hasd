/**
 * Chooses a parser based on the first character
 */
import JsonArrayParser from './parsers/array'
import JsonStringParser from './parsers/string'
import JsonTokenParser from './parsers/symbol'
import JsonNullParser from './parsers/null'
import { JsonFalseParser, JsonTrueParser } from './parsers/boolean'
import JsonNumberParser from './parsers/number'

export function chooseParser(char: string) {
	switch (char) {
		case '[':
			return JsonArrayParser()
		case '"':
			return JsonStringParser()
		// case '{': return JsonObjectParser()
		case 'n':
			return JsonNullParser()
		case 't':
			return JsonTrueParser()
		case 'f':
			return JsonFalseParser()
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
			return JsonNumberParser()
		default:
			throw new Error(`Invalid character '${char}'`)
	}
}
