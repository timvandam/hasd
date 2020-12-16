import { Readable } from 'stream'

/**
 * Converts a string into a readable stream
 * @param str String
 * @version 1.0.0
 * @since 1.0.0
 */
export function stringToReadableStream(str: string): Readable {
	return Readable.from(str, { objectMode: false, encoding: 'utf8' })
}
/**
 * Combines readable streams into one readable stream that will read from one after the other
 * @param streams The readable streams to concatenate
 * @version 1.0.0
 * @since 1.0.0
 */
export function concatReadableStreams(...streams: Readable[]): Readable {
	return Readable.from(ReadableStreamsIterator(streams))
}

/**
 * Iterates through async iterators of streams
 * @version 1.0.0
 * @since 1.0.0
 */
export async function* ReadableStreamsIterator(streams: Readable[]): AsyncGenerator<string | Buffer, void, undefined> {
	for (const stream of streams) {
		yield* stream[Symbol.asyncIterator]()
	}
}
