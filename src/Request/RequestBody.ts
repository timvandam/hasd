import { Readable } from 'stream'
import { concatReadableStreams, stringToReadableStream } from '../util/readableStream'
import RequestBodySerializer from './RequestBodySerializer'

/**
 * Basic object that describes a request body.
 * @version 1.0.0
 * @since 1.0.0
 */
export default interface RequestBody {
	/**
	 * The body of this request. Multiple types are supported (string, readablestream, etc)
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	body?: BodyType
	/**
	 * getRequestBody should not be defined for this object.
	 * This is done to be able to differentiate Request and RequestBodyGenerator instances.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	getRequestBody?: undefined
	/**
	 * Content-Type header value
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	contentType?: string
}

/**
 * Group of types that Request.body can have.
 * @version 1.0.0
 * @since 1.0.0
 */
export type BodyType = string | Readable | (string | Readable)[]

/**
 * Creates a readable stream out of a Request.
 * @param requestBody Request to use
 * @version 1.0.0
 * @since 1.0.0
 */
export function requestBodyToReadable(requestBody: RequestBody = {}): Readable {
	const { body } = requestBody

	// Handle (string|Readable)[]
	if (Array.isArray(body)) {
		return concatReadableStreams(
			...body.map((e) => {
				if (typeof e === 'string') return stringToReadableStream(e)
				else return e
			})
		)
	}

	// Handle string
	if (typeof body === 'string') return stringToReadableStream(body)

	// Handle Readable
	if (body instanceof Readable) return body

	// Empty body
	return stringToReadableStream('')
}

/**
 * Verify that a Request or RequestBodyGenerator is a Request.
 * @param body Request or RequestBodyGenerator.
 * @version 1.0.0
 * @since 1.0.0
 */
export function isRequestBody(body: RequestBody | RequestBodySerializer): body is RequestBody {
	return body.getRequestBody === undefined
}
