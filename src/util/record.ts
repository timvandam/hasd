import { HasToString } from './types'

/**
 * Casts record values to strings.
 * @param record The record in question
 */
export function convertValuesToString(
	record: Record<string | number | symbol, HasToString | HasToString[]>
): Record<string, string | string[]> {
	const result: Record<string, string | string[]> = {}
	for (const [k, v] of Object.entries(record)) {
		if (Array.isArray(v)) result[k] = v.map((e) => e.toString())
		else result[k] = v.toString()
	}
	return result
}
