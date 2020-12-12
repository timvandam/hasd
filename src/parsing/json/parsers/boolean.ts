import JsonSymbolParser from './symbol'

/**
 * True parser. Abstraction over JsonSymbolParser
 */
export function JsonTrueParser() {
	return JsonSymbolParser('true', true)
}

/**
 * False parser. Abstraction over JsonSymbolParser
 */
export function JsonFalseParser() {
	return JsonSymbolParser('false', false)
}
