/**
 * Null parser. Abstraction over JsonSymbolParser
 */
import JsonSymbolParser from './symbol'

export default function JsonNullParser() {
	return JsonSymbolParser('null', null)
}
