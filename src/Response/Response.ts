import { IncomingMessage } from 'http'

interface ResponseBody {}

/**
 * Response object.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class Response<R extends ResponseBody> {
	public body: IncomingMessage

	constructor(body: IncomingMessage) {
		this.body = body
	}
}
