import { Readable } from 'stream'

/**
 * Object that can be used to read a Response's body.
 * Can be implemented to support different content types.
 * @version 1.0.0
 * @since 1.0.0
 */
export default interface ResponseBodyDeserializer<T> {
	/**
	 * Method that reads the response.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	getResponseBody(): Promise<T>
}

export interface ResponseBodyDeserializerConstructor<T> {
	new (body: Readable): ResponseBodyDeserializer<T>
}
