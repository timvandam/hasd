import { IncomingMessage } from 'http'
import Headers from '../Headers'
import ResponseBodyDeserializer, { ResponseBodyDeserializerConstructor } from './ResponseBodyDeserializer'

/**
 * Response object.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class Response {
	public readonly ok: boolean
	private constructor(
		private readonly incomingMessage: IncomingMessage,
		public readonly headers: Headers,
		public readonly statusCode: number
	) {
		this.ok = statusCode >= 200 && statusCode < 300
	}

	public body<T>(Deserializer: ResponseBodyDeserializerConstructor<T>): Promise<T> {
		return new Deserializer(this.incomingMessage).getResponseBody()
	}

	static fromIncomingMessage(incomingMessage: IncomingMessage): Promise<Response> {
		return new Promise((resolve) => {
			const headers: Headers = {}
			for (const [k, v] of Object.entries(incomingMessage.headers)) {
				if (!v) continue
				headers[k] = v
			}

			resolve(new Response(incomingMessage, headers, incomingMessage.statusCode as number))
		})
	}
}
