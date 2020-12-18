import RequestBody from './RequestBody'

/**
 * Object that can be used to build a RequestBody.
 * Can be implemented to support different content types.
 * @version 1.0.0
 * @since 1.0.0
 */
export default interface RequestBodySerializer {
	/**
	 * Method that should return a Request instance.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	getRequestBody(): RequestBody
}
