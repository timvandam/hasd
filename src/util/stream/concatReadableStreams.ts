import { Readable } from 'stream'

/**
 * Combines readable streams into one readable stream that will read from one after the other
 * @param streams The readable streams to concatenate
 * @version 1.0.0
 * @since 1.0.0
 */
export default function concatReadableStreams(...streams: Readable[]): Readable {
	return Readable.from(ReadableStreamsIterator(streams))
}

/**
 * Async iterator through string readable streams
 * @version 1.0.0
 * @since 1.0.0
 */
async function* ReadableStreamsIterator(streams: Readable[]): AsyncGenerator<string | Buffer, void, undefined> {
	for (const stream of streams) {
		yield* stream[Symbol.asyncIterator]()
	}
}
