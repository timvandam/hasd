import ResponseBody from '../ResponseBody'

/**
 * Object that can be used to read a Response's body.
 * Can be implemented to support different content types.
 * @version 1.0.0
 * @since 1.0.0
 */
export default interface ResponseBodyDeserializer {
	/**
	 * Method that should return a Request instance.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	getResponseBody(): ResponseBody
}
