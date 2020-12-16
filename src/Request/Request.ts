import { URL } from 'url'
import { ClientRequest, request } from 'http'
import RequestBody, { isRequestBody, requestBodyToReadable } from './RequestBody'
import { Method } from './Method'
import RequestConfiguration from './RequestConfiguration'
import RequestBodySerializer from './serialize/RequestBodySerializer'
import JsonBodySerializer, { JsonValue } from './serialize/JsonBodySerializer'
import Response from '../Response/Response'

/**
 * Request builder class with default Configuration.
 * @version 1.0.0
 * @since 1.0.0
 * @todo https support
 * @todo use http.STATUS_CODES and http.METHODS
 */
export default class Request {
	private requestBody?: RequestBody
	private readonly _url: string | URL
	private options: RequestConfiguration

	/**
	 * Constructs a new request using a reference to some default Configuration.
	 * @param url Url to sent this request to
	 * @param options Request Options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	constructor(url: string | URL, options: RequestConfiguration) {
		this._url = url
		this.options = { ...options }
	}

	/**
	 * Sets the body of this request. A raw Request or a RequestBodyGenerator (preferred!) can be provided.
	 * @param body Request or RequestBodyGenerator.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public body(body: RequestBody | RequestBodySerializer): Request {
		if (isRequestBody(body)) this.requestBody = body
		else this.requestBody = body.getRequestBody()
		return this
	}

	/**
	 * Sets the body of this request using a JsonBodyGenerator.
	 * @param body Object to use as JSON body.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public json(body: JsonValue): Request {
		this.body(new JsonBodySerializer(body))
		return this
	}

	/**
	 * Sends this request
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public async send<R>(): Promise<Response> {
		return new Promise((resolve) => {
			const request = this.createRequest()
			request.once('response', (incomingMessage) => resolve(new Response(incomingMessage)))
			this.writeRequestHeaders(request)
			this.writeRequestBody(request)
		})
	}

	/**
	 * Sends a request using the native http.request
	 * @private
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	private createRequest(): ClientRequest {
		return request(this._url, {
			method: Method[this.options.method],
		})
	}

	/**
	 * Sets the headers of a request in accordance to this instance
	 * @param request The request instance to set the headers on
	 * @private
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	private writeRequestHeaders(request: ClientRequest): void {
		if (this.requestBody?.contentType) request.setHeader('Content-Type', this.requestBody.contentType)
		if (this.options.headers) {
			for (const [k, v] of Object.entries(this.options.headers)) {
				request.setHeader(k, v)
			}
		}
	}

	/**
	 * Writes the body of a request
	 * @param request The request instance to write to
	 * @private
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	private writeRequestBody(request: ClientRequest): void {
		// Pipe a body stream into the request.
		// Request.end() is automatically called once all data has been transported.
		requestBodyToReadable(this.requestBody).pipe(request)
	}
}
