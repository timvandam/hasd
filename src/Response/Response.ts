import { IncomingMessage } from 'http'
import Headers from '../Headers'
import { ResponseBodyDeserializerConstructor } from './ResponseBodyDeserializer'
import { Readable } from 'stream'
import JsonBodyDeserializer from '../body/json/JsonBodyDeserializer'

/**
 * Response object.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class Response {
	public readonly ok: boolean

	private constructor(
		private readonly _body: Readable,
		private readonly headers: Headers,
		public readonly statusCode: number
	) {
		this.ok = statusCode >= 200 && statusCode < 300
	}

	/**
	 * Reads the response using some deserializer
	 * @param Deserializer Deserializer to read the response with
	 */
	public body<T>(Deserializer: ResponseBodyDeserializerConstructor<T>): Promise<T> {
		return new Deserializer(this._body).getResponseBody()
	}

	/**
	 * Reads the response using a json deserializer.
	 */
	public json(): ReturnType<Response['body']> {
		return this.body(JsonBodyDeserializer)
	}

	/**
	 * Reads a header.
	 * @param name Header name
	 */
	public getHeader(name: string): string | string[] | undefined {
		return this.headers[name.toLowerCase()]
	}

	/**
	 * Constructs a Request instance from an incomingMessage
	 * @param incomingMessage
	 */
	static fromIncomingMessage(incomingMessage: IncomingMessage): Response {
		// TODO: Better header format
		const headers: Headers = {}
		for (const [k, v] of Object.entries(incomingMessage.headers)) {
			if (!v) continue
			headers[k] = v
		}

		return new Response(incomingMessage, headers, incomingMessage.statusCode as number)
	}
}
