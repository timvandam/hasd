import { IncomingHttpHeaders } from 'http'
import { ResponseBodyDeserializerConstructor } from './ResponseBodyDeserializer'
import { Readable } from 'stream'
import JsonBodyDeserializer from '../body/json/JsonBodyDeserializer'
import { URL } from 'url'

/**
 * Response object.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class Response {
	public readonly ok: boolean

	constructor(
		private readonly url: URL,
		private readonly _body: Readable,
		public readonly headers: IncomingHttpHeaders,
		public readonly statusCode: number
	) {
		this.ok = statusCode >= 200 && statusCode < 300
	}

	/**
	 * Reads the response using some deserializer
	 * @param Deserializer Deserializer to read the response with
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public body<T>(Deserializer: ResponseBodyDeserializerConstructor<T>): Promise<T> {
		return new Deserializer(this._body).getResponseBody()
	}

	/**
	 * Reads the response using a json deserializer.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public json(): ReturnType<Response['body']> {
		return this.body(JsonBodyDeserializer)
	}
}
