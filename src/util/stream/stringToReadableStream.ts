import { Readable } from 'stream'

/**
 * Converts a string into a readable stream
 * @param str String
 * @version 1.0.0
 * @since 1.0.0
 */
export default function stringToReadableStream(str: string): Readable {
	return Readable.from(str, { objectMode: false, encoding: 'utf8' })
}
