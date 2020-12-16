import { IncomingMessage } from 'http'

/**
 * Response object.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class Response {
	// TODO: Deserializing to handle the body in async calls

	constructor(private incomingMessage: IncomingMessage) {}
}
