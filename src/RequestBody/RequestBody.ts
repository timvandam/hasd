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
	 * This is done to be able to differentiate RequestBody and RequestBodyGenerator instances.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	getRequestBody?: undefined
	/**
	 * Content-Type header value
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	contentType: string
}

/**
 * Group of types that RequestBody.body can have.
 * @version 1.0.0
 * @since 1.0.0
 */
export type BodyType = string | ReadableStream | (ReadableStream | string)[]

/**
 * Object that can be used to build a RequestBody. Can be implemented to support different content types.
 * @version 1.0.0
 * @since 1.0.0
 */
export interface RequestBodyGenerator {
	/**
	 * Method that should return a RequestBody instance.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	getRequestBody(): RequestBody
}

/**
 * Verify that a RequestBody or RequestBodyGenerator is a RequestBody.
 * @param body RequestBody or RequestBodyGenerator.
 * @version 1.0.0
 * @since 1.0.0
 */
export function isRequestBody(body: RequestBody | RequestBodyGenerator): body is RequestBody {
	return body.getRequestBody === undefined
}
